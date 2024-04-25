import { useEffect } from "react"
import Cookies from "js-cookie"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import useStore from "@/store"
import { Button } from "../ui/button"
import { ListFilter } from "lucide-react"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import DropdownFilter from "./DropdownFilter"
import { DialogClose } from "@radix-ui/react-dialog"

export function ButtonFilter() {
    const { id, fetchActivity, setIsOpen, fetchProject, page, setSelectedFilters } = useStore()
    const access_token = Cookies.get('token')

    const handleSubmitFilter = () => {
        fetchActivity(access_token, page, '', id)
        setIsOpen(false)
    }


    useEffect(() => {
        fetchProject(access_token)
    }, [page])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <ListFilter className="text-primary-red h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Filter</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col justify-center gap-4">
                        <Label htmlFor="proyek" className="text-xs text-black text-opacity-50">
                            Proyek <span className="text-primary-red">*</span>
                        </Label>
                        <DropdownFilter />
                    </div>
                </div>
                <Separator />
                <DialogFooter className="flex justify-end">
                    <Button type="submit" onClick={() => setSelectedFilters([])} className="text-primary-red bg-transparent hover:bg-transparent hover:scale-105">Hapus Filter</Button>
                    <DialogClose asChild>
                        <Button onClick={handleSubmitFilter} className="bg-primary-red hover:bg-primary-red text-white hover:scale-105" type="submit">Terapkan</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

