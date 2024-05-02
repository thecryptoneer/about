import { NextRequest } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "bson";
import { safeVerifyMessage } from "@/lib/utils";
import { isValidAddress } from "@ethereumjs/util";
import jwt from "jsonwebtoken";
import { APIResponse } from "@/interfaces";

export async function GET(request: NextRequest) {
  const responseData: APIResponse = {
    endpoint: "GET /api/auth/message/request",
    result: undefined,
    error: "",
  };
  const timestamp = Date.now();

  const { searchParams } = new URL(request.url);
  let address = searchParams.get("address") || "";
  address = address.toLowerCase();

  // return error if address is missing
  if (!address) {
    responseData.error = "Missing address parameter";
    return new Response(responseData.toString(), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // return error if address is invalid
  if (!isValidAddress(address)) {
    responseData.error = "Invalid address format";
    return new Response(responseData.toString(), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const client = await clientPromise;
  const db = client.db("restricted");
  const dbMessages = db.collection("messages");
  const dbUsers = db.collection("users");
  // check if user exists for address
  const user = await dbUsers.findOne({ address: address });

  // create user and return message to sign
  if (!user) {
    // create new user in db
    const userId = new ObjectId();
    await dbUsers.insertOne({
      _id: userId,
      address: address,
      created_at: timestamp,
    });

    // create message to sign
    const { message, messageId, error } = await createMessage(
      address,
      "new-user",
      timestamp,
      userId,
    );
    if (error) {
      responseData.error = error;
      return new Response(responseData.toString(), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // return message to sign
    responseData.result = { messageId, message, timestamp, address };
    return new Response(responseData.toString(), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // get messages for user
  const messages = await dbMessages
    .find({
      $and: [
        { address },
        { signature: { $exists: true } },
        { signature: { $nin: [null, ""] } },
        { timestamp: { $gt: timestamp - 24 * 60 * 60 * 1000 } },
      ],
    })
    .toArray();

  // get latest message by timestamp
  const latestMessage =
    messages?.sort((a, z) => z.timestamp - a.timestamp)[0] || {};
  let userIsVerified = false;
  try {
    userIsVerified = safeVerifyMessage(
      address,
      latestMessage.message,
      latestMessage.signature,
    );
  } catch (e: any) {
    console.log("Error verifying signature:", e.message);
  }

  if (!messages?.length || !userIsVerified) {
    // create message to sign
    const { message, messageId, error } = await createMessage(
      address,
      "login-user",
      timestamp,
      user._id,
    );
    if (error) {
      responseData.error = error;
      return new Response(responseData.toString(), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // return message to sign
    responseData.result = { messageId, message, timestamp, address };
    return new Response(responseData.toString(), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // create signed jwt token to use for future requests
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      data: {
        address,
        userId: user._id?.toString(),
        messageId: latestMessage._id?.toString(),
      },
    },
    process.env.JWT_SECRET,
  );

  // user is verified
  responseData.result = {
    token,
  };
  return new Response(responseData.toString(), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

async function createMessage(
  address,
  action,
  timestamp,
  userId,
  visibleToUser?,
): Promise<{
  message?: string;
  messageId?: any;
  error?: string;
}> {
  const separator = ":";
  if (!visibleToUser) {
    visibleToUser = "Please sign this message to register your wallet.";
  }
  visibleToUser = visibleToUser.replace(new RegExp(separator, "g"), ""); // replace all separators from visibleToUser
  visibleToUser.indexOf(separator) > -1 &&
    console.log("Error: separator found in visibleToUser");
  if (!action) {
    action = "register_wallet";
  }
  const message = [visibleToUser, address, action, timestamp].join(separator);

  // find message for user with same action
  const userMessages = await dbMessages.find({ address: address }).toArray();
  const actionMessage = userMessages.find((item) =>
    item.message.includes(action),
  );
  let messageId = new ObjectId();
  if (actionMessage?._id) {
    messageId = actionMessage._id;
  }

  return new Promise(async (resolve, reject) => {
    try {
      await dbMessages.updateOne(
        { _id: messageId },
        {
          $set: {
            uId: userId,
            address: address,
            message,
            timestamp,
          },
        },
        { upsert: true },
      );
      resolve({ message, messageId, error: undefined });
    } catch (error: any) {
      resolve({ message, messageId, error: error.message });
    }
  });
}
