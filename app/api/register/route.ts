import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const emails = await prisma.user.findMany({
            select: {
                email:true,
            }
        });

        const roles = await prisma.role.findMany();


        return NextResponse.json({
            emails: emails,
            roles: roles,
        });
        

    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching roles.' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Parse the body of the POST request
        const { firstname, middlename, lastname, email, password, role } = await req.json();

        
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        // Logic to create a user in the database
        const user = await prisma.user.create({
            data: {
                firstname,
                middlename,
                lastname,
                email,
                password: hashedPassword, // Remember to hash the password before storing it
                roleId: role, // Assuming role is a foreign key reference to the roles table
            },
        });

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
