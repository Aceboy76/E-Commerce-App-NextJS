'use server'

import { PrismaClient } from "@prisma/client"
import { genSaltSync, hashSync } from "bcrypt-ts";

const prisma = new PrismaClient()

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

export async function createUser(values: RegisterProps) {
    try {
        const { firstname, middlename, lastname, email, password, role } = values

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        // Create user and select only necessary fields to return
        const user = await prisma.user.create({
            data: {
                firstname,
                middlename,
                lastname,
                email,
                password: hashedPassword,
                roleId: role,
            }
        })

        return user
    } catch (error) {

    }
}


