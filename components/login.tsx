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
import { Eye, EyeClosed, LoaderCircle, Terminal, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"




export default function Login() {

    const router = useRouter()

    const [showPass, setShowPass] = useState(false)
    const [isloading, setLoading] = useState(false)
    const [showAlert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState<string>('')


    const toggleShowPass = useCallback(() => {
        setShowPass((showPass) => !(showPass))
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

    function alertDef(message: string, url: string) {
        setAlert(true);
        setAlertMsg(message);

        setTimeout(() => {
            router.push(url);
            setAlert(false);
        }, 3000);

    }


    const handleSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        try {
            const loginStatus = await loginUser(values);
            console.log("Login status:", loginStatus);

            if (loginStatus && loginStatus.success) {
                if (loginStatus.role === 'seller') {
                } else if (loginStatus.role === 'customer') {
                    alertDef('You are now logged in', '/customerPage');
                }
            }
            if (loginStatus && !loginStatus.success && loginStatus.field === 'email') {
                form.setError("email", {
                    message: "Email not found",
                });
            }
            if (loginStatus && !loginStatus.success && loginStatus.field === 'password') {
                form.setError("password", {
                    message: "Password is incorrect",
                });
                form.setError("confirmPassword", {
                    message: "Password is incorrect",
                });
            }



        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [form]);



    return (
        <>



            <div className="w-screen h-screen flex items-center justify-center bg-slate-200">

                <Card className="w-1/4" >
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <CardHeader className="flex flex-row justify-between">
                                <div>
                                    <CardTitle>LOGIN</CardTitle>
                                    <CardDescription>Enter your credentials</CardDescription>
                                </div>

                                <Link href={isloading ? "" : "/"}>
                                    <Button type="button" disabled={isloading} variant={"ghost"}>
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
                            </CardContent>
                            <CardFooter className="flex flex-row justify-between">
                                <Link href={isloading ? "" : "/register"}>
                                    <Button className="text-blue-700" disabled={isloading} variant={"link"}
                                        type="button">
                                        Create an account?
                                    </Button>
                                </Link>
                                <Button type="submit" variant={"default"} disabled={isloading}>
                                    {isloading ? <LoaderCircle className="animate-spin" /> : "Submit"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>

                </Card>


                {showAlert && (
                    <div className="absolute z-50 top-10 w-2/6 ">
                        <Alert className=" bg-black text-white">
                            <Terminal className="h-4 w-4 stroke-white" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                {alertMsg}
                            </AlertDescription>
                        </Alert>
                    </div>
                )}
            </div>

        </>

    )

}
