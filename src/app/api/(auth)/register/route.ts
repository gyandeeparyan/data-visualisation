import { NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import { hashPassword } from '../../../../utils/auth';
import User from "@/models/User";

export async function POST(req: Request) {
  const { email, password ,username} = await req.json();
 await dbConnect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const hashedPassword = await hashPassword(password);


  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    
  });
  
  await newUser.save();

  return NextResponse.json({ message: 'User created' }, { status: 201 });
}
