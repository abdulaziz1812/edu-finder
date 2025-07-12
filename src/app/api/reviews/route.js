import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, collegeId, collegeName,  review, rating, name, photo } = await req.json();

  if (!email || !collegeId || !review || !collegeName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const reviewsCollection = await dbConnect("reviews");

  const existing = await reviewsCollection.findOne({ email, collegeId });

  if (existing) {
    await reviewsCollection.updateOne(
      { email, collegeId },
      { 
        $set: { 
          review,
          rating: parseInt(rating) || 5,
          name,
          photo,
          collegeName,
          
          date: new Date(),
        },
      }
    );
  } else {
    await reviewsCollection.insertOne({
      email,
      collegeId,
      collegeName,
      
      review,
      rating: parseInt(rating) || 5,
      name,
      photo,
      date: new Date(),
    });
  }

  return NextResponse.json({ success: true });
}

export async function GET(req) {
  const url = req.nextUrl;
  const query = {};
  if (url.searchParams.get("email")) query.email = url.searchParams.get("email");
  if (url.searchParams.get("collegeId")) query.collegeId = url.searchParams.get("collegeId");

  const reviewsCollection = await dbConnect("reviews");
  const result = await reviewsCollection.find(query).sort({ date: -1 }).limit(20).toArray();

  return NextResponse.json(result);
}
