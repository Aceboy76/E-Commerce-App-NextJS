'use server';

import { encrypt } from "@/lib/lib";
import { getSession } from "@/lib/session";
import prisma from "@/prisma/db";
import { compare } from "bcrypt-ts"; // Import bcrypt for password comparison
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


interface LoginProps {
    email: string;
    password: string;
}


export async function loginUser(values: LoginProps) {



    try {
        const user = await prisma.user.findUnique({
            where: {
                email: values.email,
            },
            include: { role: true }
        });
        console.log("user: " + user as string)

        const hasSession = await getSession();
        console.log("existingSession: " + hasSession)

        if (hasSession) {
            return "user is already logged in"
        }

        if (!user) {
            return "The email or password is incorrect";
        }

        const result = await compare(values.password, user.password);


        if (result) {
            const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);

            const sessionData = {
                name: user.firstname + ' ' + user.middlename + ' ' + user.lastname,
                email: user.email,
                expires,
            };
            console.log('sessionData: ' + sessionData as string);

            const session = await encrypt(sessionData);
            console.log('session: ' + session)

            const cookie = (await cookies()).set("session", session, { expires, httpOnly: true });
            console.log('cookie: ' + cookie)

            // return "User is logged In";

            if (user.role.role_name == "Seller") {
                return "seller"
            } else if (user.role.role_name == "Customer") {
                return "customer"

            }
        }
    } catch (error) {
        console.error(error);
    }

}
