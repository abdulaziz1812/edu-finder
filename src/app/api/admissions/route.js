import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const admissionsCollection = await dbConnect("admissions");

  await admissionsCollection.insertOne(data);

  return NextResponse.json({ success: true });
}

export async function GET(req) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  const admissions = await dbConnect("admissions");
  const result = await admissions.find({ email }).toArray();

  return NextResponse.json(result);
}
