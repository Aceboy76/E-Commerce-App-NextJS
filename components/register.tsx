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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface Role {
    id: string;
    role_name: string;
}
interface Email {
    email: string;
}
export default function Register() {


    const [isClient, setIsClient] = useState(false)
    const [roles, setRoles] = useState<Role[]>([])
    const [emails, setEmails] = useState<string[]>([])


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/register')

            const data = await response.json()

            const fetchedEmails = data.emails.map((key: Email) => key.email);

            setRoles(data.roles);
            setEmails(fetchedEmails);

        }
        fetchData()
        setIsClient(true)
    }, [])

    const formSchema = z.object({
        firstname: z.string().min(2).max(50),
        middlename: z.string().min(2).max(50).optional(),
        lastname: z.string().min(2).max(50),
        role: z.string().min(1, ({ message: "Role is required" })),
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z.string().min(6, ({ message: "Password must be 6 characters" })),
        confirmPassword: z.string().min(6, ({ message: "Password must be 6 characters" })),

    }).refine((data) => data.password == data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"]
    }).refine(async (data) => {
        if (emails.includes(data.email)) {
            return false;
        }
        return true;
    }, {
        message: "Email already exists",
        path: ["email"]
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            role: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
       

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })

        const result = await response.json()
        if (response.ok) {
            form.reset()
            alert("User was created successfully")
        }

    }

    return (
        <>
            {isClient && (
                <div className="w-screen h-screen flex items-center justify-center bg-slate-200">

                    <Card className="w-1/2" >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <CardHeader>
                                    <CardTitle>LOGIN</CardTitle>
                                    <CardDescription>Enter your credentials</CardDescription>
                                </CardHeader>
                                <CardContent className="flex flex-row space-x-10">
                                    <div className="w-1/2 space-y-6 ">
                                        <FormField control={form.control} name="firstname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Firstname</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Firstname" type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField control={form.control} name="middlename"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Middlename</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Middlename" type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField control={form.control} name="lastname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Lastname</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Lastname" type="text"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />


                                        <FormField control={form.control} name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel>
                                                    <FormControl>
                                                        <Select name="role" value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Role" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {roles && roles.map(role =>
                                                                (
                                                                    <SelectItem key={role.id} value={role.id}>{role.role_name}</SelectItem>
                                                                ))}

                                                            </SelectContent>
                                                        </Select>

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                    </div>
                                    <div className="w-1/2 space-y-6 ">
                                        <FormField control={form.control} name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" type="email"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField control={form.control} name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Password" type="password"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField control={form.control} name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Confirm Password" type="password"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} /></div>
                                </CardContent>
                                <CardFooter className="flex flex-row justify-between">
                                    <Button variant={"link"} type="button">
                                        <Link className="text-blue-500" href={"/login"}>Already have an account?</Link>
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