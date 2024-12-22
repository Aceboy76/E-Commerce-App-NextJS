'use client'
import { loginUser } from "@/app/api/account/login/action"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"




export default function Login() {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const formSchema = z.object({
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z.string().min(6, ({ message: "Password must be 6 characters" })),
        confirmPassword: z.string().min(6, ({ message: "Password must be 6 characters" })),

    }).refine((data) => data.password == data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"]
    })



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        }

    })


    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const isUser = await loginUser(values);

            alert(isUser)
        } catch (error) {
            console.error(error)
        }


    }

    return (
        <>
            {isClient && (
                <div className="w-screen h-screen flex items-center justify-center bg-slate-200">

                    <Card className="w-1/4" >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <CardHeader className="flex flex-row justify-between">
                                    <div>
                                        <CardTitle>LOGIN</CardTitle>
                                        <CardDescription>Enter your credentials</CardDescription>
                                    </div>

                                    <Link href={"/"}>
                                        <Button type="button" variant={"ghost"}>
                                            <X />
                                        </Button>
                                    </Link>

                                </CardHeader>
                                <CardContent className=" space-y-4">
                                    <FormField control={form.control} name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Email" type="text"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField control={form.control} name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input placeholder="Password"
                                                            type="password"
                                                            className="pr-14"
                                                            {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"ghost"}
                                                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                    >
                                                        <Eye />
                                                    </Button>
                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField control={form.control} name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <div className="relative">
                                                    <FormControl>
                                                        <Input placeholder="Confirm Password"
                                                            type="password"
                                                            className="pr-14"
                                                            {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"ghost"}
                                                        className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                    >
                                                        <Eye />
                                                    </Button>
                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </CardContent>
                                <CardFooter className="flex flex-row justify-between">
                                    <Link href={"/register"}>
                                        <Button className="text-blue-700" variant={"link"} type="button">
                                            Create an account?
                                        </Button>
                                    </Link>
                                    <Button type="submit" variant={"default"}>Submit</Button>
                                </CardFooter>
                            </form>
                        </Form>

                    </Card>
                </div>
            )}



        </>
    )
}