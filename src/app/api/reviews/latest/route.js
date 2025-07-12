import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const reviewsCollection = await dbConnect("reviews");

  const result = await reviewsCollection
    .find({})
    .sort({ date: -1 })
    .limit(6)
    .toArray();

  return NextResponse.json(result);
}