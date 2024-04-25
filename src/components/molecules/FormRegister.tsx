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
import useStore from "@/store"
import { useRouter } from "next/router"

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Nama karyawan harus terdiri dari setidaknya 2 karakter.",
    }),
    password: z.string().min(8, {
        message: "Password harus terdiri dari setidaknya 8 karakter.",
    }),
    rate: z.number().gte(10000, {
        message: "Rate harus lebih dari 10000.",
    })
});
export function FormRegister() {
    const router = useRouter()
    const URL = process.env.NEXT_PUBLIC_API_URL
    const { fetchRegister } = useStore()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            rate: 10000
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        fetchRegister(`${URL}user/register`, values)
        form.reset()
        router.push('/login')
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} >
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
                                <FormField
                                    control={form.control}
                                    name="rate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rate</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    {...field}
                                                    value={field.value.toString()}
                                                    onChange={(e) =>
                                                        field.onChange(parseInt(e.target.value, 10))
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="mt-2 gap-2 flex flex-col">
                            <CardDescription className="flex justify-center">
                                <Link href={"/login"}>Already have account ?</Link>
                            </CardDescription>
                            <CardFooter className="flex justify-end">
                                <Button type="submit">Register</Button>
                            </CardFooter>
                        </div>
                    </form>
                </Form >
            </CardContent>

        </Card>

    )
}
