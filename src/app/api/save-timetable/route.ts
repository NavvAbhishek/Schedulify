import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/dbConfig';
import Timetable from '@/models/timetableModel';
connect();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const savedTimetable = await Timetable.findOneAndUpdate(
            {},
            { schedule: data },
            { upsert: true, new: true }
        );

        return NextResponse.json({ message: "Timetable data saved", data: savedTimetable });
    } catch (error: any) {
        return NextResponse.json({ message: "Failed to save timetable data", error: error.message }, { status: 500 });
    }
}