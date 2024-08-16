import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'; 
import Timetable from '@/models/timetableModel'; // Assuming the model is already defined
connect();

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching timetable data from MongoDB...");
    
    // Fetch the timetable data from the database
    const timetableData = await Timetable.findOne({});

    if (!timetableData) {
      console.log("No timetable data found in the database.");
      return NextResponse.json({ message: "No timetable data found" }, { status: 404 });
    }

    console.log("Timetable data found:", timetableData);
    
    // Return the timetable data as JSON
    return NextResponse.json({
        message:"Time table data found",
        data:timetableData
    });
  } catch (error: any) {
    console.error("Failed to retrieve timetable data:", error.message);
    return NextResponse.json({ message: "Failed to retrieve timetable data", error: error.message }, { status: 500 });
  }
}
