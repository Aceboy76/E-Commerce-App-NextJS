'use client'
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
import { compare } from "bcrypt-ts"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface User {
    password: string;
    email: string;
}


export default function Login() {

    const [isClient, setIsClient] = useState(false)
    const [users, setUsers] = useState<User[]>([])



    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/login')
            const data = await response.json()


            setUsers(data)
        }

        fetchData()
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
        const user = users.find(user => values.email == user.email)

        if (user) {
            compare(values.password, user.password).then((result) => {
                if (result) {
                    alert("user is authenticated")
                } else[
                    alert("user is not authenticated")

                ]
            });
        }

    }

    return (
        <>
            {isClient && (
                <div className="w-screen h-screen flex items-center justify-center bg-slate-200">

                    <Card className="w-1/4" >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <CardHeader>
                                    <CardTitle>LOGIN</CardTitle>
                                    <CardDescription>Enter your credentials</CardDescription>
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
                                                <div className="flex flex-row">
                                                    <FormControl>
                                                        <Input placeholder="Password" type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"ghost"}
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
                                                <div className="flex flex-row">
                                                    <FormControl>
                                                        <Input placeholder="Confirm Password" type="password"
                                                            {...field} />

                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"ghost"}
                                                    >
                                                        <Eye />
                                                    </Button>
                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                </CardContent>
                                <CardFooter className="flex flex-row justify-between">
                                    <Button variant={"link"} type="button">
                                        <Link className="text-blue-500" href={"/register"}>Create an account</Link>
                                    </Button>
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