import { Button } from "./ui/button";
import Link from "next/link";

interface MessageProps {
    Message: string;
    buttonTitle?: string;
    link?: string;
}

export default function Message({ Message, buttonTitle, link }: MessageProps) {
    return (
        <div className="flex flex-col justify-center items-center text-center">
            <p className="text-lg mb-4">
                {Message}
            </p>
            {link && buttonTitle && (
                <div className="w-full">
                    <Link href={link}>
                        <Button
                            className="flex items-center justify-center w-full bg-green-300 text-black text-2xl py-10 px-10 tracking-wider hover:bg-green-500"
                            variant="default"
                            type="button"
                        >
                            {buttonTitle}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
