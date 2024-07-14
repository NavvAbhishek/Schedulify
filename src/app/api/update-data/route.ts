import { connect } from '@/dbConfig/dbConfig'
import Class from '@/models/classModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        const { _id, className, roomCapacity, teacherId, teacherName, subject, teacherAvailability } = data;

        const updatedClass = await Class.findByIdAndUpdate(
            _id,
            { className, roomCapacity, teacherId, teacherName, subject, teacherAvailability },
            { new: true }
        )

        if (!updatedClass) {
            return NextResponse.json({ message: 'Class not found' }, { status: 404 });
        }
        return NextResponse.json(updatedClass, { status: 200 });
    } catch (error) {
        console.error('Failed to update class', error);
        return NextResponse.json({ message: 'Failed to update class' }, { status: 500 });
    }
}