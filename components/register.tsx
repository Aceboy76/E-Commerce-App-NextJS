'use client'
import { checkExistingUser, encryptAccCreds, getRoles } from "@/app/api/account/register/action"
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
import { Eye, EyeClosed, LoaderCircle, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"


interface Role {
    id: string;
    role_name: string;
}

export default function Register() {
    const [isClient, setIsClient] = useState(false)
    const [roles, setRoles] = useState<Role[]>([])
    const [isloading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const router = useRouter();


    useEffect(() => {
        async function fetchData() {
            const roles = await getRoles()
            setRoles(roles);
        }
        fetchData()
        setIsClient(true)
    }, [])

    const toggleShowPass = () => {
        setShowPass((showPass) => !(showPass))
    }

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
    })


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
        setLoading(true)

        try {
            const existingUser = await checkExistingUser(values)

            if (existingUser) {
                form.setError("email", {
                    message: "Email already exists",
                });
                setLoading(false)
                return
            }

            const emailSent = await encryptAccCreds(values)

            if (emailSent) {
                form.reset()
                setLoading(false)
                router.push('/register/emailSent');
            }
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center bg-slate-200">

                {isClient && (

                    <Card className="w-1/2" >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <CardHeader className="flex flex-row justify-between">
                                    <div>
                                        <CardTitle>REGISTER</CardTitle>
                                        <CardDescription>Create your credentials</CardDescription>
                                    </div>

                                    <Link href={isloading ? "" : "/"} >
                                        <Button type="button" disabled={isloading} variant={"ghost"}>
                                            <X />
                                        </Button>
                                    </Link>

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
                                                    <div className="relative">
                                                        <FormControl>
                                                            <Input placeholder="Password"
                                                                type={showPass ? 'text' : 'password'}
                                                                className="pr-14"
                                                                {...field} />
                                                        </FormControl>
                                                        <Button
                                                            type="button"
                                                            onClick={toggleShowPass}
                                                            variant={"ghost"}
                                                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                        >
                                                            {showPass ? <EyeClosed /> : <Eye />}
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
                                                                type={showPass ? 'text' : 'password'}
                                                                className="pr-14"
                                                                {...field} />
                                                        </FormControl>
                                                        <Button
                                                            type="button"
                                                            onClick={toggleShowPass}
                                                            variant={"ghost"}
                                                            className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                                        >
                                                            {showPass ? <EyeClosed /> : <Eye />}

                                                        </Button>
                                                    </div>

                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-row justify-between">
                                    <Link href={isloading ? "" : "/login"}>
                                        <Button className="text-blue-700" disabled={isloading} variant={"link"}
                                            type="button">
                                            Already have an account?
                                        </Button>
                                    </Link>
                                    <Button type="submit" variant={"default"} disabled={isloading}>
                                        {isloading ? <LoaderCircle className="animate-spin" /> : "Submit"}
                                    </Button>

                                </CardFooter>
                            </form>
                        </Form>

                    </Card>

                )}


            </div>
        </>
    )
}
