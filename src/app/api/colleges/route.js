import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  const collegesCollection = await dbConnect("colleges");
  const colleges = await collegesCollection.find().toArray(); 

  return NextResponse.json(colleges);
}
