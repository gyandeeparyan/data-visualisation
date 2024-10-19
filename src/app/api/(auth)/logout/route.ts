import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
   // Clear the cookies
   response.cookies.delete('token'); // Removes the token cookie
   response.cookies.delete('userId'); // Removes the userId cookie
  return response;
}
