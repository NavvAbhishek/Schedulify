import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        response.cookies.set("token", "", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            expires: new Date(0),
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
