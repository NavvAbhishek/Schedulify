import { connect } from "@/dbConfig/dbConfig";
import Class from '@/models/classModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Received request body:", reqBody);

        const { className, roomCapacity, teacherId, teacherName, subject, teacherAvailability } = reqBody;

        // Filter out invalid or empty strings from teacherAvailability
        const validTeacherAvailability = (teacherAvailability || []).filter((day: string) => 
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day)
        );

        const newClass = new Class({
            className,
            roomCapacity,
            teacherId,
            teacherName,
            subject,
            teacherAvailability: validTeacherAvailability,
        });

        const savedClass = await newClass.save();
        console.log("Saved class:", savedClass);

        return NextResponse.json({
            message: "Class created successfully",
            success: true,
            savedClass
        });
    } catch (error: any) {
        console.error("Error creating class:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
