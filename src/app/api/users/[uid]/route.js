import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(_, context) {
  const { params } = await context;  
  const usersCollection = await dbConnect("users");
  const user = await usersCollection.findOne({ uid: params.uid });
  return NextResponse.json(user);
}

export async function PUT(req, context) {
  const { params } = await context;  
  const body = await req.json();
  const usersCollection = await dbConnect("users");
  await usersCollection.updateOne({ uid: params.uid }, { $set: body });
  return NextResponse.json({ success: true });
}
