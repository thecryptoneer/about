import { NextRequest } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "bson";
import { safeVerifyMessage } from "@/lib/utils";
import { isValidAddress } from "@ethereumjs/util";
import jwt from "jsonwebtoken";
import { APIResponse } from "@/interfaces";
import { baseHeaders } from "../../../../../../config/api";

export async function POST(request: NextRequest) {
  const body = await request.json();
  let { signature, messageId } = body;
  messageId = new ObjectId(messageId);

  const responseData: APIResponse = {
    endpoint: "GET /api/auth/message/sign",
    result: undefined,
    error: "",
  };

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
  const db = client.db("tax3000");
  const dbMessages = db.collection("messages");
  const dbUsers = db.collection("users");

  // check if user exists for address
  const user = await dbUsers.findOne({ address: address });
  if (!user) {
    responseData.error = "User not found";
    return new Response(responseData.toString(), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // check if message exists
  const message = await dbMessages.findOne({ _id: messageId });
  if (!message) {
    responseData.error = "Message not found";
    return new Response(responseData.toString(), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  // verify message signature and senderAddress
  const isValid = safeVerifyMessage(address, message.message, signature);
  if (!isValid) {
    responseData.error = "Invalid signature";
    return new Response(responseData.toString(), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // update message (signature)
  await dbMessages.updateOne(
    { _id: messageId },
    {
      $set: {
        signature: body.signature,
      },
    },
  );

  // create signed jwt token to use for future requests
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      data: {
        address,
        userId: user._id?.toString(),
        messageId: message._id?.toString(),
      },
    },
    process.env.JWT_SECRET,
  );

  // return auth success response
  responseData.result = { token };
  return new Response(responseData.toString(), {
    status: 200,
    headers: baseHeaders,
  });
}
