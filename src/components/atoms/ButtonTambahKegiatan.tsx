
import { CirclePlus } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import useStore from "@/store";
import axios from 'axios'
import Swal from 'sweetalert2'
import { ButtonTambahProject } from "./ButtonTambahProject";
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogClose = DialogPrimitive.Close
export function ButtonTambahKegiatan() {
    const access_token = Cookies.get('token')
    const { projectData, fetchActivity, page, id, setToogle, toogleKegiatan, setToogleKegiatan, idEditActivity, setIdEditActivity, fetchEditActivity, fetchActivityById, activityDataById, setActivityDataById } = useStore();


    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setActivityDataById({ ...activityDataById, [id]: value });
    };

    const handleSelectChange = (value: any) => {
        if (value === 'close') {
            setToogleKegiatan(false);
            setToogle(true)
            return
        }
        setActivityDataById({ ...activityDataById, projectId: parseInt(value) });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!activityDataById.tanggalMulai || !activityDataById.tanggalBerakhir || !activityDataById.waktuMulai || !activityDataById.waktuBerakhir || !activityDataById.activity || !activityDataById.projectId) {
            return;
        }
        try {
            if (idEditActivity !== 0) {
                fetchEditActivity(access_token, idEditActivity, activityDataById)
                Swal.fire({
                    title: "Berhasil",
                    text: "Edit Kegiatan Baru Berhasil",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                setActivityDataById({
                    tanggalMulai: '',
                    tanggalBerakhir: '',
                    waktuMulai: '',
                    waktuBerakhir: '',
                    activity: '',
                    projectId: 0,
                });
                fetchActivity(access_token, page, '', id)
            } else {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}activity/create`, activityDataById, { headers: { "access_token": access_token } })
                Swal.fire({
                    title: "Berhasil",
                    text: "Tambah Kegiatan Baru Berhasil",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setActivityDataById({
                tanggalMulai: '',
                tanggalBerakhir: '',
                waktuMulai: '',
                waktuBerakhir: '',
                activity: '',
                projectId: 0,
            });
            setIdEditActivity(0)
            setToogleKegiatan(false);
            fetchActivity(access_token, page, '', id)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (idEditActivity !== 0) {
            fetchActivityById(access_token, idEditActivity)
        }
        fetchActivity(access_token, page, '', id)
    }, [idEditActivity, page])

    return (
        <>
            <ButtonTambahProject />
            <Dialog open={toogleKegiatan} onOpenChange={setToogleKegiatan}>
                <DialogTrigger asChild>
                    <Button size={"sm"} onClick={() => setIdEditActivity(0)} className="bg-primary-light-blue text-primary-blue hover:bg-primary-blue hover:text-primary-light-blue">
                        <CirclePlus className="mr-2 h-4 w-4" /> Tambah Kegiatan
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full">
                    <DialogHeader>
                        <DialogTitle>Tambah Kegiatan Baru</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col">
                        <div className="flex gap-4 py-4">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="tanggalMulai" className="text-xs text-black text-opacity-50">
                                    Tanggal Mulai <span className="text-primary-red">*</span>
                                </Label>
                                <Input
                                    id="tanggalMulai"
                                    value={activityDataById.tanggalMulai}
                                    onChange={handleChange}
                                    type="date"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="tanggalBerakhir" className="text-xs text-black text-opacity-50">
                                    Tanggal Berakhir <span className="text-primary-red">*</span>
                                </Label>
                                <Input
                                    id="tanggalBerakhir"
                                    value={activityDataById.tanggalBerakhir}
                                    onChange={handleChange}
                                    type="date"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="waktuMulai" className="text-xs text-black text-opacity-50">
                                    Waktu Mulai <span className="text-primary-red">*</span>
                                </Label>
                                <Input
                                    id="waktuMulai"
                                    value={activityDataById.waktuMulai}
                                    onChange={handleChange}
                                    type="time"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="waktuBerakhir" className="text-xs text-black text-opacity-50">
                                    Waktu Berakhir <span className="text-primary-red">*</span>
                                </Label>
                                <Input
                                    id="waktuBerakhir"
                                    value={activityDataById.waktuBerakhir}
                                    onChange={handleChange}
                                    type="time"
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="activity" className="text-xs text-black text-opacity-50">
                                    Judul Kegiatan <span className="text-primary-red">*</span>
                                </Label>
                                <Input
                                    id="activity"
                                    value={activityDataById.activity}
                                    onChange={handleChange}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="flex flex-col gap-4">
                                <label htmlFor="namaProyek" className="text-xs text-black text-opacity-50">
                                    Nama Proyek <span className="text-primary-red">*</span>
                                </label>
                                <select
                                    className="border-2 rounded-lg w-full p-2"
                                    id="namaProyek"
                                    value={activityDataById.projectId}
                                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleSelectChange(event.target.value)}
                                >
                                    <option className="text-sm ">
                                        Pilih Proyek
                                    </option>
                                    <option onClick={() => setToogle(true)} className="text-sm text-primary-red" value={'close'}>
                                        + Tambah Proyek
                                    </option>
                                    {projectData && projectData.map((project: any) => (
                                        <option key={project.id} value={project.id}>{project.project}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end">
                        <DialogClose onClick={() => setIdEditActivity(0)} asChild>
                            <Button type="button" className="text-primary-red bg-transparent hover:bg-transparent hover:scale-105">Kembali</Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} className="bg-primary-red hover:bg-primary-red text-white hover:scale-105" type="button">Simpan</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
