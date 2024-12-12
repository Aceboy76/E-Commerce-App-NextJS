import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(){
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
                password: true,
            }
        })

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching users.' }, { status: 500 });
        
    }
}