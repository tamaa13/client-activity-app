import { Separator } from "@/components/ui/separator"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Cookies from 'js-cookie'
import { TableKegiatan } from "../atoms/TableKegiatan"
import { useRouter } from "next/router"
import { formatCurrency } from "@/lib/utils"
import axios from 'axios'
import { useEffect, useState } from "react";
import useStore from "@/store"
import { ButtonTambahKegiatan } from "../atoms/ButtonTambahKegiatan"
import { ButtonFilter } from "../atoms/ButtonFilter"


const access_token = Cookies.get('token')
const URL = process.env.NEXT_PUBLIC_API_URL
const CardKegiatan = () => {
    const { id, fetchActivity, activityData, page } = useStore()
    const [userData, setUserData] = useState({ username: '', rate: 0 })
    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${URL}getUser`, {
                headers: {
                    access_token
                }
            })
            setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchActivity(access_token, page, '', id)
    }, [])


    const router = useRouter()
    const handleLogout = () => {
        Cookies.remove('token')
        router.push('/login')
    }

    return (
        <div className="bg-white rounded-lg drop-shadow-xl">
            <div className="flex justify-between">
                <div className="flex gap-10 pt-5 px-5 items-center">
                    <div className="flex flex-col">
                        <span>Nama Karyawan</span>
                        <span>{userData?.username}</span>
                    </div>
                    <div className="flex flex-col">
                        <span>Rate</span>
                        <span>{formatCurrency(userData.rate)}/Jam</span>
                    </div>
                </div>
                <div className="flex items-center justify-center p-5">
                    <Button onClick={handleLogout} className="bg-primary-red">Logout</Button>
                </div>
            </div>
            <Separator className="h-[2px] my-5" />
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="p-5 gap-2 flex items-center">
                        <span className="font-semibold">Daftar Kegiatan</span>
                        <ButtonTambahKegiatan />
                    </div>
                    <div className="flex gap-2 p-5">
                        <Input onChange={(e) => fetchActivity(access_token, page, e.target.value, id)} type="text" placeholder="Cari" />
                        <ButtonFilter />
                    </div>
                </div>
                <TableKegiatan activityData={activityData} rate={userData?.rate} />
            </div>
        </div>
    )
}

export default CardKegiatan
