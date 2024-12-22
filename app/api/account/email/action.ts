'use server'

import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import { decrypt, encrypt } from '@/lib/lib';


const prisma = new PrismaClient();


const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
};

export const sendVerificationEmail = async (email: string, token:string) => {

    try {
        var transporter = nodemailer.createTransport(smtpConfig);


        const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/register/verifyEmail?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            html: `<p>Please verify your email by clicking on the link provided. This will confirm your email address and complete the registration process. You can verify your email by clicking on the 'Verify Email' link in the message we sent you: <a href="${verificationUrl}">Verify Email</a></p>`,
        });
    } catch (error) {
        console.error(error);
    }

};

export default async function verifyEmail(tokenFromUrl: string) {

    try {
        const decryptedToken = await decrypt(tokenFromUrl)

        const isEmailExist = await prisma.user.findUnique({
            where: {
                email: decryptedToken.email,
            },
        });


        if (isEmailExist) {
            console.log("email is already exist")
            return "email is already exist"
        }


        const decryptEmail = {
            email: decryptedToken.email
        }
        const emailToken = await encrypt(decryptEmail)
        console.log(decryptedToken + "           " + emailToken)

        const verifyTime = new Date().toISOString();


        const user = await prisma.user.create({
            data: {
                firstname: decryptedToken.firstname,
                middlename: decryptedToken.middlename,
                lastname: decryptedToken.lastname,
                email: decryptedToken.email,
                emailVerified: verifyTime,
                emailVerifyToken: emailToken,
                password: decryptedToken.password,
                roleId: decryptedToken.role,
            }
        })

        console.log(user)

        return "User is created"
    } catch (error) {
        console.error(error);
        return "token is expired"

    }



}






