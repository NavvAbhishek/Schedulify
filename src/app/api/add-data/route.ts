import { connect } from "@/dbConfig/dbConfig";
import Class from '@/models/classModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        console.log("Received request body:", reqBody);

        const { className, roomCapacity, teacherId, teacherName, subject, teacherAvailability } = reqBody
        console.log(reqBody)

        const newClass = new Class({
            className,
            roomCapacity,
            teacherId,
            teacherName,
            subject,
            teacherAvailability
        })

        const savedClass = await newClass.save()
        console.log(savedClass)

        return NextResponse.json({
            message: "Class created successfully",
            success: true,
            savedClass
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}