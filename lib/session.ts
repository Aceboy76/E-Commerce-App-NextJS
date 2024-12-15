import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { decrypt, encrypt } from "./lib";

// const prisma = new PrismaClient()

// interface SessionProps {
//     userId: string;
// }

// export async function CreateSession({ userId }: SessionProps) {

//     try {

//         const session = await prisma.session.create({
//             data: {
//                 userId: userId
//             }
//         })

//         return session
//     } catch (error) {

//     }
// }

export async function getSession() {
    const session = (await cookies()).get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}


export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}