import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  const { params } =  context; 

  const collegesCollection = await dbConnect("colleges");
  const college = await collegesCollection.findOne({ _id: new ObjectId(params.id) });

  if (!college) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  college._id = college._id.toString();

  return NextResponse.json(college);
}
