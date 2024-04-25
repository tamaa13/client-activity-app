import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';

const Navbar = () => {
    const router = useRouter();
    const { pathname } = router;

    return (
        <div className={`${pathname === '/register' || pathname === '/login' ? 'hidden' : 'block'} top-0 w-full`}>
                <div className="text-primary-red flex bg-white my-1 mx-1 p-3 flex-col text-lg font-bold">
                    <span>Timesheet</span>
                    <span>Management</span>
                </div>

            <div className="flex flex-col bg-white my-1 mx-1">
                <span className="text-2xl font-semibold flex items-center p-5">HH Timesheet</span>
                <div className="flex gap-5 items-end px-10">
                    <Button text="Daftar Kegiatan" link="/" />
                    <Button text="Pengaturan" link="/pengaturan" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
