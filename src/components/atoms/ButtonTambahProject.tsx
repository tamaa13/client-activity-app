import { useState } from "react";
import axios from 'axios'
import Swal from 'sweetalert2'
import useStore from "@/store";
import Cookies from "js-cookie";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


const DialogClose = DialogPrimitive.Close
export function ButtonTambahProject() {
    const URL = process.env.NEXT_PUBLIC_API_URL
    const access_token = Cookies.get('token')

    const { toogle, setToogle, id, fetchActivity, fetchProject, projectDataById, setProjectDataById,page } = useStore()

    const handleChange = (e: any) => {
        const { value } = e.target;
        setProjectDataById({ ...projectDataById, [e.target.id]: value });
    }

    // console.log(projectDataById)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!projectDataById.project) {
            return
        }
        try {
            console.log(projectDataById, access_token);
            const response = await axios.post(`${URL}project`, projectDataById, { headers: { access_token } })
            Swal.fire({
                title: "Berhasil",
                text: "Tambah Proyek Baru Berhasil",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            console.log(response);
            setToogle(false)
        } catch (error) {
            console.log(error)
        }
        setProjectDataById({
            project: ''
        })
        setToogle(false)
        fetchActivity(access_token, page, '', id)
        fetchProject(access_token)
    }
    return (
        <Dialog open={toogle} onOpenChange={setToogle}>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Project</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col justify-center gap-4">
                        <Label htmlFor="proyek" className="text-xs text-black text-opacity-50">
                            Nama Proyek <span className="text-primary-red">*</span>
                        </Label>
                        <Input onChange={handleChange} id="project" type="text" />
                    </div>
                </div>
                <Separator />
                <DialogFooter className="flex justify-end">
                    <DialogClose asChild><Button className="text-primary-red bg-transparent hover:bg-transparent hover:scale-105">Kembali</Button></DialogClose>
                    <Button onClick={handleSubmit} type="submit" className="text-white bg-primary-red hover:bg-primary-red hover:scale-105">Simpan</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
