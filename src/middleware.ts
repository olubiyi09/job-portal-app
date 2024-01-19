import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    try {
        // const homePath = path === "/"
        const isPublicPath = path === "/login" || path === "/register"

        // If there is no token and page is not public, redirect to login
        const token = request.cookies.get("token")?.value || ""
        if (!token && !isPublicPath) {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }
        // If there is a token and the page is public redirect to home page
        if (token && isPublicPath) {
            return NextResponse.redirect(new URL("/", request.nextUrl))
        }
        if (!token && path === "/profile") {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }
        if (!token && path === "/applications") {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
        }

    } catch (error: any) {
        return NextResponse.error()
    }

}

export const config = {
    matcher: [
        // "/",
        "/login",
        "/register",
        "/profile",
        "/jobs",
        "/applications"
    ]
}