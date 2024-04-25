import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, Trash, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateFromISOString, formatDurasi } from "@/lib/utils"
import Cookies from "js-cookie"
import useStore from "@/store"
import { ButtonTambahKegiatan } from "./ButtonTambahKegiatan"
interface Time {
    hours: number;
    minutes: number;
}
export type Project = {
    id: number;
    project: string;
}

export type Kegiatan = {
    id: number;
    activity: string;
    Project: Project;
    ProjectId: number;
    userId: string;
    createdAt: any;
    updatedAt: any;
    waktuMulai: Time;
    waktuBerakhir: Time;
    durasi: number;
    tanggalMulai: Date;
    tanggalBerakhir: Date;
}

const access_token = Cookies.get('token')

export const handleRefetch = async (refetch: any) => {
    return await refetch
}


export function TableKegiatan({ ...props }) {
    const { fetchActivity, fetchDeleteActivity, setIdEditActivity, id, setToogleKegiatan, page, setPage, activityData } = useStore()
    // console.log(activityData.data)

    const { rate } = props
    const columns: ColumnDef<Kegiatan>[] = [
        {
            accessorKey: "activity",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Judul Kegiatan
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => <div className="text-center">{row.getValue("activity")}</div>
        },
        {
            accessorKey: "Project",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Nama Proyek
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => <div className="text-center">{row?.getValue("Project").project}</div>
        },
        {
            accessorKey: "tanggalMulai",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Tanggal Mulai
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => (
                <div className="text-center">
                    {formatDateFromISOString(row.getValue("tanggalMulai"))}
                </div>
            ),
        },
        {
            accessorKey: "tanggalBerakhir",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Tanggal Berakhir
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => (
                <div className="text-center">
                    {formatDateFromISOString(row.getValue("tanggalBerakhir"))}
                </div>
            ),
        },
        {
            accessorKey: "waktuMulai",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Waktu Mulai
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => (
                <div className="text-center">
                    {row.getValue("waktuMulai")}
                </div>
            ),
        },
        {
            accessorKey: "waktuBerakhir",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Waktu Berakhir
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => (
                <div className="text-center">
                    {row.getValue("waktuBerakhir")}
                </div>
            ),
        },
        {
            accessorKey: "durasi",
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            Durasi
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }: any) => (
                <div className="text-center">
                    {formatDurasi(row.getValue("durasi"))}
                </div>
            ),
        },
        {
            accessorKey: "id",
            header: () => <div className="flex items-center justify-center">Aksi</div>,
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center gap-3 text-primary-red">
                    <Pencil className="h-4 w-4 hover:cursor-pointer" onClick={() => handleEdit(row.getValue("id"))} />
                    <Trash className="h-4 w-4 hover:cursor-pointer" onClick={() => {
                        fetchDeleteActivity(access_token, row.getValue("id"))
                            .then(() => {
                                fetchActivity(access_token, page, '', id)
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }}
                    />
                </div>
            ),
        },
    ]

    // console.log(props.rate)
    const handleEdit = (id: number) => {
        setToogleKegiatan(true)
        setIdEditActivity(id)
    }

    const data: Kegiatan[] = activityData.data
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const handlePreviousPage = async () => {
        setPage(page - 1)
    }

    return (
        <div className="w-full p-8">
            <div className="rounded-t-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="bg-background flex flex-col px-5 py-2 gap-2 text-primary-blue">
                    <div className="flex justify-between">
                        <span>Total Durasi</span>
                        {data?.length ? formatDurasi(data?.reduce((a, b) => a + b.durasi, 0)) : "0"}
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total Pendapatan</span>
                        {data?.length ? formatCurrency((data.reduce((total, item) => total + item.durasi, 0) / 60) * rate) : "0"}
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {activityData?.page} of{" "}
                    {activityData?.total_pages} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page === activityData?.total_pages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
