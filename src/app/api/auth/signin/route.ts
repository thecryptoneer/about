import { NextRequest } from "next/server";
import clientPromise from "../../../../../database/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { APIResponse } from "@/interfaces";
import { demoUserId, resumeId } from "../../../../../config";
import { ObjectId } from "bson";
const client = await clientPromise;

export async function POST(request: NextRequest) {
  const responseData: APIResponse = {
    endpoint: "POST /api/auth/signin",
    result: undefined,
    error: "",
  };
  try {
    const body = await request.json();
    const { password } = body;
    const timestamp = Date.now();

    // return error if password is missing
    if (!password) {
      responseData.error = "Missing password parameter";
      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = client.db("restricted");
    const dbUser = db.collection("user");
    const dbResume = db.collection("resume");
    const user = await dbUser.findOne({ _id: new ObjectId(demoUserId) });
    if (!user) {
      responseData.error = "User not found";
      return new Response(JSON.stringify(responseData), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cvData =
      (await dbResume.findOne({ _id: new ObjectId(resumeId) })) || {};

    // check password match and make sure we don't return any unauthorized data
    try {
      if (bcrypt.compareSync(password, user.password)) {
        responseData.result = {
          _id: user._id,
          name: user.name,
          role: user.role,
          timestamp,
          cvData: cvData,
          token: jwt.sign(
            {
              _id: user._id,
              name: user.name,
              role: user.role,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            },
          ),
        };
      }
    } catch (e) {
      console.log({ e });
      responseData.error = "Password incorrect";
      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!responseData.result?.token) {
      responseData.error = "Password incorrect";
      return new Response(JSON.stringify(responseData), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.log({ e });
    responseData.error = e;
    return new Response(JSON.stringify(responseData), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
