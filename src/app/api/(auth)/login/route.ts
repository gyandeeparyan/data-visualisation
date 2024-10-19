import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  // Set the token in a cookie and also return it in the response body
  const response = NextResponse.json({ message: 'Logged in', token, user });
  response.cookies.set('userId', user._id.toString(), { httpOnly: true }); // Store user ID in cookie
  return response;
  
  return response;
}
