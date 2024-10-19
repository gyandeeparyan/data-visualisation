import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

// Extend the NextRequest type to include a "user" property
declare module 'next/server' {
  interface NextRequest {
    user?: any; // You can define a specific type for the user if needed
  }
}

export function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token'); // Get the token from cookies
  
  // Handle the case where tokenCookie might be undefined
  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
  }

  const token = tokenCookie.value; // Access the value of the cookie

  try {
    // Verify the JWT token and store the decoded information (user) in req.user
    const verified = jwt.verify(token, process.env.JWT_SECRET!); // Ensure process.env.JWT_SECRET is set
    req.user = verified; // Attach the verified user information to the request
    return NextResponse.next(); // Allow the request to proceed
  } catch (error) {
    console.log(error)
    // If token verification fails, redirect to the login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard',], // Apply middleware to protected routes
};
