import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Timetable from '@/models/timetableModel';

connect();

export async function DELETE(req: NextRequest) {
    try {
        console.log("Deleting timetable shedule data from MongoDB...")

        const deleteData = await Timetable.deleteMany({});

        if (deleteData.deletedCount === 0) {
            console.log("No timetable shedule data found to delete.");
            return NextResponse.json({ message: "No timetable shedule data found to delete" }, { status: 404 });
        }

        console.log("Timetable shedule data deleted successfully.");
        return NextResponse.json({ message: "Timetable shedule data deleted successfully" });
    } catch (error: any) {
        console.error("Failed to delete timetable shedule data:", error.message);
        return NextResponse.json({ message: "Failed to delete timetable shedule data", error: error.message }, { status: 500 });
    }
}