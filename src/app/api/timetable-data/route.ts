import { NextRequest, NextResponse } from 'next/server';

let timetableData: any = [];

// POST method to save timetable data
export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Parse the request body as JSON
    timetableData = data;
    return NextResponse.json({ message: "Timetable data received" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save timetable data" }, { status: 500 });
  }
}

// GET method to retrieve timetable data
export async function GET() {
  try {
    return NextResponse.json(timetableData);
  } catch (error) {
    return NextResponse.json({ message: "Failed to retrieve timetable data" }, { status: 500 });
  }
}
