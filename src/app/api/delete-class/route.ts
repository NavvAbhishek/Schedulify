import { NextRequest, NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import Class from "@/models/classModel"

connect()

export async function DELETE(req: NextRequest){
    try {
        const url = new URL(req.url);
        const classId = url.searchParams.get('id')

        if(!classId){
            return NextResponse.json({error:"Class ID is required"},{status:400});
        }

        await Class.findByIdAndDelete(classId);

        return NextResponse.json({ message: "Class deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}