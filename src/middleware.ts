import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const path = req.nextUrl.pathname;

    if (!token?.value && path !== "/login" || token?.value && path === "/register") {
        return NextResponse.redirect(new URL("/login", req.url));
    } else if (token?.value && path === "/login" || token?.value && path === "/register") {
        return NextResponse.redirect(new URL("/", req.url));
    } else {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/", "/login"],
};
