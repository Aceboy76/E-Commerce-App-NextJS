import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { decrypt, encrypt } from "./lib";


export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}


export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    if (!parsed) return;

    parsed.expires = new Date(Date.now() + 1 * 60 * 60 * 1000);

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: new Date(parsed.expires),
    });
    return res;
}

export async function deleteSession() {
    (await cookies()).set("session", "", { expires: new Date(0) });
}
