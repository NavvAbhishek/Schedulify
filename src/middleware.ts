import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === "/login" || path === "/signup"
    const token = req.cookies.get('token')?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", req.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);

            const { payload } = await jwtVerify(token, secret);
            const userRole = payload.role;

            const restrictedRoutesForTeachers = [
                "/timetable-data",
                "/timetable",
            ];
            if (userRole === "teacher" && restrictedRoutesForTeachers.includes(path)) {
                return NextResponse.redirect(new URL("/", req.nextUrl));
            }

            const restrictedRoutesForStudents = [
                "/timetable-data",
                "/timetable",
                "/teacher-dashboard",
                "/admin-dashboard"
            ];
            if (userRole === "student" && restrictedRoutesForStudents.includes(path)) {
                return NextResponse.redirect(new URL("/", req.nextUrl));
            }

        } catch (error) {
            console.error("Invalid token", error);
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }
    }
}

export const config = {
    matcher: [
        '/login',
        '/signup',
        '/profile',
        '/timetable-data',
        '/timetable',
        "/teacher-dashboard",
        "/admin-dashboard"
    ],
}