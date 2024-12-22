'use client';

import verifyEmail from "@/app/api/account/email/action";
import Message from "@/components/messagePage";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get('token') || '';

    const [verificationStatus, setVerification] = useState<string>('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function emailVerified() {
            try {
                setLoading(true);
                const verificationStatus = await verifyEmail(tokenFromUrl);
                setVerification(verificationStatus);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        emailVerified();
    }, [tokenFromUrl]);

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {isLoading && (
                <div className="flex flex-col justify-center items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-[350px]" />
                        <Skeleton className="h-6 w-[300px]" />
                    </div>
                </div>
            )}
            {verificationStatus === "User is created" && (
                <Message
                    Message="Your email has been successfully verified. You can now proceed to the login page to access your account."
                    buttonTitle="Go to login"
                    link="/login"
                />
            )}
            {verificationStatus === "email is already exist" && (
                <Message
                    Message="Your email could not be verified. An existing account associated with this email. Create new account with different email."
                    buttonTitle="Go to Register"
                    link="/register"
                />
            )}
            {verificationStatus === "token is expired" && (
                <Message
                    Message="Your email could not be verified. The verification token is expired. Try to register again."
                    buttonTitle="Go to Register"
                    link="/register"
                />
            )}
        </div>
    );
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={
            <div className="flex flex-col justify-center items-center">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-[350px]" />
                    <Skeleton className="h-6 w-[300px]" />
                </div>
            </div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}
