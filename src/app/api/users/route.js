import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const usersCollection = await dbConnect("users");

  
  const result = await usersCollection.updateOne(
    { uid: body.uid },    
    { $set: body },       
    { upsert: true },      
  );

  return NextResponse.json({ success: true, result });
}
