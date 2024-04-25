import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Cookies from 'js-cookie'

const formSchema = z.object({
    namaKaryawan: z.string().min(2, {
        message: "Nama karyawan harus terdiri dari setidaknya 2 karakter.",
    }),
    rate: z.number().gte(10000, {
        message: "Rate harus lebih dari 10000.",
    })
});

export function FormPengaturan({ userData }: any) {
    const access_token = Cookies.get('token')
    const URL = process.env.NEXT_PUBLIC_API_URL
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            namaKaryawan: userData.username,
            rate: userData.rate
        },
    })

    const fetchEditUser = async (data: any) => {
        const { namaKaryawan, rate } = data
        try {
            const res = await axios.patch(`${URL}getUser/editUser`, { username: namaKaryawan, rate }, {
                headers: {
                    access_token
                }
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log()
        fetchEditUser(values)
    }

    return (
        <div className="bg-white p-10 rounded-lg drop-shadow-xl md:w-96">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="namaKaryawan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Karyawan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nama Karyawan" {...field} />
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
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(parseInt(e.target.value, 10))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="gap-5 flex items-center justify-center">
                        <Button className="text-primary-blue bg-background hover:bg-background hover:scale-105 transform hover:drop-shadow-xl" onClick={() => form.reset()}>Cancel</Button>
                        <Button className="bg-primary-blue hover:bg-primary-blue hover:scale-105 hover:drop-shadow-xl transform" type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}


