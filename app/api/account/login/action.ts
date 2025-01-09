'use server';

import { encrypt } from "@/lib/lib";
import prisma from "@/prisma/db";
import { compare } from "bcrypt-ts"; // Import bcrypt for password comparison
import { cookies } from "next/headers";


interface LoginProps {
    email: string;
    password: string;
}


export async function loginUser(values: LoginProps) {


    try {
        const user = await prisma.user.findUnique({
            where: {
                email: values.email
            },
            include: { role: true },
        });

        if (!user) {
            console.log("Validation failed: User not found");
            return {
                success: false,
                field: "email"
            };
        }

        const isPassCorrect = await compare(values.password, user.password);

        if (!isPassCorrect) {
            return {
                success: false,
                field: "password"
            };
        }

        const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);

        const sessionData = {
            name: user.firstname + ' ' + user.middlename + ' ' + user.lastname,
            role: user.role.role_name,
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
            return {
                success: true,
                role: "seller"
            };
        } else if (user.role.role_name == "Customer") {
            return {
                success: true,
                role: "customer"
            };

        }
    } catch (error) {
        console.error(error);
    }

}
