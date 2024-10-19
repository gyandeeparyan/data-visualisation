import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { verifyPassword } from '@/utils/auth';
import { generateToken } from '@/utils/auth';
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user || !(await verifyPassword(password, user.password))) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken({ email: user.email });
  return NextResponse.json({ token });
}
