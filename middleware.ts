
import { NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {


    await updateSession(request)

}

export const config = {
    matcher: [
    ],
};