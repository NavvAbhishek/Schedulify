import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/dbConfig'; 
import Class from '@/models/classModel'; 
connect();

export async function GET(req: NextRequest) {
  try {
    const classesData = await Class.find({});
    return NextResponse.json({
      messsage: "Classes Data Found",
      data: classesData
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}