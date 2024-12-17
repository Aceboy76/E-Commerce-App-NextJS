import nodemailer from 'nodemailer';

interface EmailVerificationProps {
    email: string;
    token: string;
}

const smtpConfig = {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
};

export const sendVerificationEmail = async ({ email, token }: EmailVerificationProps) => {
    var transporter = nodemailer.createTransport(smtpConfig);


    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/register/verifyEmail?token=${token}`;
    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking on the link: <a href="${verificationUrl}">Verify Email</a></p>`,
    });
};