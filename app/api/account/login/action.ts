'use server'

import { encrypt } from "@/lib/lib";
import { getSession } from "@/lib/session";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt-ts"; // Import bcrypt for password comparison
import { cookies } from "next/headers";

const prisma = new PrismaClient();

interface LoginProps {
    email: string;
    password: string;
}

export async function loginUser(values: LoginProps) {


    const user = await prisma.user.findUnique({
        where: {
            email: values.email,
        }
    });

    const hasSession = await getSession();

    if (hasSession) {
        return "user is already logged in" 
    }

    if (!user) {
        return "The email or password is incorrect";
    }

    const result = await compare(values.password, user.password);

    if (result) {
        const expires = new Date(Date.now() + 10 * 1000);
        
        const sessionData = {
            userId: user.id,
            email: user.email,
            expires,
        };

        const session = await encrypt(sessionData);

        (await cookies()).set("session", session, { expires, httpOnly: true });
        return "User is logged In";
    }



}
