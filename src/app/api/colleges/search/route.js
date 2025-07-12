import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const collegesCollection = await dbConnect("colleges");
    const regex = new RegExp(name, "i"); 
    const collegesCursor = collegesCollection.find({ name: regex }).limit(10);
    const collegesArray = await collegesCursor.toArray();

    
    const colleges = collegesArray.map((c) => ({
      ...c,
      _id: c._id.toString(),
    }));

    return NextResponse.json(colleges);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
