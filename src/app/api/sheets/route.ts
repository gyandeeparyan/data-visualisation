import { NextResponse } from 'next/server';
import { getGoogleSheetData } from '@/lib/google-sheets';

export async function GET() {
  const data = await getGoogleSheetData();
  return NextResponse.json({ data });
}
