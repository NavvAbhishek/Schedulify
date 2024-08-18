// src/app/api/check-timetable/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Timetable from "@/models/timetableModel";

connect();

export async function GET(req: NextRequest) {
  try {
    const timetableCount = await Timetable.countDocuments();

    return NextResponse.json({
      exists: timetableCount > 0,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
