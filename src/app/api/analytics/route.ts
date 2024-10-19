import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const { ageRange, gender, startDate, endDate } = await req.json();
   await dbConnect();

  const query = {
    age: { $gte: ageRange[0], $lte: ageRange[1] },
    gender,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  };

  const data = await User.find(query).exec();
  return NextResponse.json({ data });
}
