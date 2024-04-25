import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useStore from "@/store"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Nama karyawan harus terdiri dari setidaknya 2 karakter.",
    }),
    password: z.string().min(8, {
        message: "Password harus terdiri dari setidaknya 8 karakter.",
    })
});

export function FormLogin() {
    const { fetchActivity, id, page } = useStore()
    const router = useRouter()
    const URL = process.env.NEXT_PUBLIC_API_URL

    const fetchLogin = async (dataLogin: any) => {
        try {
            const { data } = await axios.post(
                `${URL}user/login`, dataLogin
            );

            Cookies.set('token', data.access_token);
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await fetchLogin(values)
    }

    return (
        <Form {...form} >
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <FormControl>
                                                <Input id="username" placeholder="Username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <Input id="name" type="password" placeholder="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mt-2 gap-2">
                            <CardDescription className="flex justify-center">
                                <Link href={"/register"}>Don&apos;t have account ?</Link>
                            </CardDescription>
                            <CardFooter className="flex justify-end">
                                <Button type="submit">Login</Button>
                            </CardFooter>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Form >
    )
}
