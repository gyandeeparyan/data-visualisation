import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  const { username,email, password } = await req.json();
  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({username, email, password: hashedPassword });
  await newUser.save();

  return NextResponse.json({ message: 'User registered successfully' });
}
