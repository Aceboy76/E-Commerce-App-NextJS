'use server'

import { encrypt } from "@/lib/lib";
import { PrismaClient } from "@prisma/client"
import { genSaltSync, hashSync } from "bcrypt-ts";
import { sendVerificationEmail } from "../email/action";

const prisma = new PrismaClient()
const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

interface RegisterProps {
    email: string;
    firstname: string;
    middlename?: string;
    lastname: string;
    password: string;
    role: string;
}

export async function getRoles() {
    const roles = await prisma.role.findMany()

    return roles
}

export async function checkExistingUser(values: RegisterProps) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: values.email,
        },
    })

    return existingUser
}

export async function encryptAccCreds(values: RegisterProps) {
    try {

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(values.password, salt);

        const newAccount = {
            firstname: values.firstname,
            middlename: values.middlename,
            lastname: values.lastname,
            email: values.email,
            password: hashedPassword,
            role: values.role,
        }

        const token = await encrypt(newAccount)
        await sendVerificationEmail(values.email, token)

        return true

    } catch (error) {
        console.error(error)
        return false
    }



}


