import Message from "@/components/messagePage";

export default function EmailSent() {
    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center">
                <Message
                    Message="  An email is sent to your account."

                />
            </div>

        </>
    )
}