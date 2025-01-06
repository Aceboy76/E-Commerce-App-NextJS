'use server'

import nodemailer from 'nodemailer';
import { decrypt, encrypt } from '@/lib/lib';
import prisma from '@/prisma/db';




const smtpConfig = {
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
};


const brandColor = "#346df1"
const color = {
  background: "#f9f9f9",
  text: "#444",
  mainBackground: "#fff",
  buttonBackground: brandColor,
  buttonBorder: brandColor,
  buttonText: "#fff",
}

export const sendVerificationEmail = async (email: string, token: string) => {

  try {
    const transporter = nodemailer.createTransport(smtpConfig);


    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/register/verifyEmail?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>E Commerce App</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${verificationUrl}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>`,
    });
  } catch (error) {
    console.error(error);
  }

};

export default async function verifyEmail(tokenFromUrl: string) {

  try {
    const decryptedToken  = await decrypt(tokenFromUrl)

    const isEmailExist: object | null = await prisma.user.findUnique({
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

    const user = await prisma.user.create({
      data: {
        firstname: decryptedToken.firstname,
        middlename: decryptedToken.middlename,
        lastname: decryptedToken.lastname,
        email: decryptedToken.email,
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






