"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function GuestLayout() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <>
            <div className="w-screen bg-amber-400 py-6 px-40">
                <div className="w-full flex flex-row space-x-8">
                    {/* Logo */}
                    <div className="w-fit h-20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="82" height="40" fill="none" viewBox="0 0 82 40"><path fill="#FFD43D" d="M73.365 19.71c0 2.904-2.241 5.31-5.27 5.31-3.03 0-5.228-2.406-5.228-5.31 0-2.905 2.199-5.312 5.228-5.312s5.27 2.407 5.27 5.311Z" /><path fill="#FF0C81" d="M48.764 19.544c0 2.946-2.323 5.145-5.27 5.145-2.904 0-5.227-2.2-5.227-5.145 0-2.947 2.323-5.104 5.228-5.104 2.946 0 5.27 2.158 5.27 5.104Z" /><path fill="#11EEFC" d="M20.074 25.02c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312Z" /><path fill="#171A26" d="M68.095 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.855-10.83 11.12-10.83 6.349 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.03 0 5.27-2.406 5.27-5.31 0-2.905-2.24-5.312-5.27-5.312-3.029 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM43.08 40c-4.813 0-8.506-2.116-10.373-5.934l4.896-2.655c.913 1.784 2.614 3.195 5.394 3.195 3.486 0 5.85-2.448 5.85-6.473v-.374c-1.12 1.411-3.111 2.49-6.016 2.49-5.768 0-10.373-4.481-10.373-10.581 0-5.934 4.813-10.788 11.12-10.788 6.431 0 11.162 4.605 11.162 10.788v8.299C54.74 35.27 49.76 40 43.08 40Zm.415-15.311c2.946 0 5.27-2.2 5.27-5.145 0-2.947-2.324-5.104-5.27-5.104-2.905 0-5.228 2.158-5.228 5.104s2.323 5.145 5.228 5.145ZM20.074 30.54c-6.307 0-11.12-4.897-11.12-10.872 0-5.934 4.854-10.83 11.12-10.83 6.348 0 11.162 4.938 11.162 10.83 0 5.975-4.855 10.871-11.162 10.871Zm0-5.52c3.029 0 5.27-2.406 5.27-5.31 0-2.905-2.241-5.312-5.27-5.312-3.03 0-5.228 2.407-5.228 5.311 0 2.905 2.199 5.312 5.228 5.312ZM0 0h5.892v30H0V0ZM82 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" /></svg>
                    </div>
                    <div className="w-fit text-nowrap h-20 flex items-center justify-center font-semibold">
                        <p className="text-2xl ">STORE TITLE</p>
                    </div>
                    <div className="flex flex-col w-full px-6 space-y-4">
                        <div className="h-1/2 flex flex-row space-x-2 justify-between">

                            <div className="ml-32  flex flex-row w-fit space-x-3">
                                {isClient && (
                                    <Input type="text" className="w-96 bg-slate-200" placeholder="Search" />

                                )}
                                <Button variant={"secondary"} type="button">
                                    <Search />
                                </Button>
                            </div>


                            <div className="flex flex-row w-fit">
                                <Button variant={"link"} type="button" className=" text-2xl">
                                    <Link href={"/auth/login"}>Login</Link>
                                </Button>
                                <Button variant={"link"} type="button" className=" text-2xl">
                                    <Link href={"/auth/register"}>Register</Link>
                                </Button>
                            </div>

                        </div>
                        <div className="h-1/2 flex flex-row space-x-2 justify-center mr-60 ">

                            <div>
                                <Button variant={"link"} type="button" className="text-lg">
                                    Sales
                                </Button>
                                <Button variant={"link"} type="button" className="text-lg">
                                    Sales
                                </Button>
                                <Button variant={"link"} type="button" className="text-lg">
                                    Sales
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}