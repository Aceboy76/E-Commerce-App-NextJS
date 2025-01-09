
import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {

    const isLoggedIn = await getSession()
    const url = request.nextUrl;


    if (isLoggedIn && url.pathname === '/login' || isLoggedIn && url.pathname === '/register') {
        return NextResponse.redirect(new URL('/', request.url));
    }


    await updateSession(request)
}

export const config = {
    matcher: ['/login', '/register'],
};