import { FormPengaturan } from '@/components/molecules/FormPengaturan'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

const Index = () => {
    const URL = process.env.NEXT_PUBLIC_API_URL
    const [userData, setUserData] = useState<any>({})
    const access_token = Cookies.get('token')

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${URL}getUser`, {
                headers: {
                    access_token
                }
            })
            if (data) setUserData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    })


    return (
        <div className='w-full flex items-center py-10 mx-auto justify-center'>
            {Object.keys(userData).length > 0 && (
                <FormPengaturan userData={userData} />
            )}
        </div>
    )
}

export default Index