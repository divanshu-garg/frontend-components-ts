import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    type SortingState,
    useReactTable
} from "@tanstack/react-table"
import { tableData, type TableData } from "../../utils/helper.ts"
import { useState } from "react";
import {
    ChevronDown,
    ChevronsUpDown,
    ChevronUp,
    ChevronLeft,
    ChevronRight,
    Download,
    Plus,
    Printer,
    Search,
    Calendar,
    MapPin,
    Tag
} from "lucide-react";

const columnHelper = createColumnHelper<TableData>()

const columns = [
    columnHelper.accessor('id', {
        header: "Order ID",
        cell: (info) => <span className="font-mono text-gray-900 font-medium">#{info.getValue()}</span>,
    }),
    columnHelper.accessor('customer', {
        header: "Customer",
        cell: (info) => (
            <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{info.getValue()}</span>
                <span className="text-xs text-gray-400">View Profile</span>
            </div>
        ),
    }),
    columnHelper.accessor('city', {
        header: "Destination",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('state', {
        header: "State",
        cell: (info) => <span className="text-gray-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor('orderDate', {
        header: "Date",
        cell: (info) => {
            const value = info.getValue();
            return (
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </div>
            )
        },
    }),
    columnHelper.accessor('amount', {
        header: "Total Amount",
        cell: (info) => {
            const value = info.getValue();
            return (
                <span className="font-bold text-gray-900">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
                </span>
            );
        },
    }),
    columnHelper.accessor('status', {
        header: "Status",
        cell: (info) => {
            const status = info.getValue();
            const colors: Record<string, string> = {
                "Delivered": "text-emerald-700 bg-emerald-50 border border-emerald-100",
                "Pending": "text-amber-700 bg-amber-50 border border-amber-100",
                "Shipped": "text-blue-700 bg-blue-50 border border-blue-100",
                "Cancelled": "text-rose-700 bg-rose-50 border border-rose-100",
            };
            return (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${colors[status] || "text-gray-600 bg-gray-50 border-gray-200"}`}>
                    {status}
                </span>
            );
        },
    }),
    columnHelper.accessor('priority', {
        header: "Priority",
        cell: (info) => {
            const priority = info.getValue();
            const isHigh = priority === "High";
            return (
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isHigh ? 'bg-rose-500 animate-pulse' : 'bg-gray-300'}`} />
                    <span className={isHigh ? 'text-rose-600 font-medium' : 'text-gray-500'}>{priority}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('paymentMethod', {
        header: "Payment",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('items', {
        header: "Qty",
        cell: (info) => <span className="text-center block">{info.getValue()}</span>,
    })
]

const Table = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, _setData] = useState<TableData[]>(tableData)
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, _setIsLoading] = useState(false);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, rowSelection },
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        manualSorting: true,
        initialState: {
            pagination: {
                pageSize: 5, // Default page size
            },
        }
    })

    return (
        <div className="bg-gray-50/50 min-h-screen p-4 md:p-8 font-sans text-gray-800">
            <div className="max-w-350 mx-auto space-y-8">

                {/* === SECTION 1: HEADER === */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
                        <p className="text-gray-500 mt-1">Manage and track your recent store activity.</p>
                    </div>

                    <div className="flex sm:flex-row gap-3 w-full md:w-auto">
                        <button className="flex flex-col sm:flex-none items-center justify-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            <Download size={18} className="text-gray-500" />
                            Export
                        </button>
                        <button className="flex flex-col sm:flex-none items-center justify-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                            <Printer size={18} className="text-gray-500" />
                            Print
                        </button>
                        <button className="flex flex-col sm:flex-none items-center justify-center px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/20 transition-all shadow-sm">
                            <Plus size={18} />
                            Create Order
                        </button>
                    </div>
                </div>

                {/* === SECTION 2: CONTROLS === */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-rose-500/20 focus:bg-white transition-all outline-none"
                            />
                        </div>
                        <div className="flex overflow-x-auto pb-2 lg:pb-0 gap-3 no-scrollbar">
                            <div className="relative group shrink-0">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-rose-500 transition-colors" size={16} />
                                <select className="appearance-none bg-gray-50 border-none hover:bg-rose-50/50 pl-10 pr-10 py-3 rounded-xl text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-rose-500/20 transition-all">
                                    <option>Status: All</option>
                                    <option>Delivered</option>
                                    <option>Pending</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative group shrink-0">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-rose-500 transition-colors" size={16} />
                                <select className="appearance-none bg-gray-50 border-none hover:bg-rose-50/50 pl-10 pr-10 py-3 rounded-xl text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-rose-500/20 transition-all">
                                    <option>Location: All</option>
                                    <option>Mumbai</option>
                                    <option>Delhi</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative group shrink-0">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-rose-500 transition-colors" size={16} />
                                <select className="appearance-none bg-gray-50 border-none hover:bg-rose-50/50 pl-10 pr-10 py-3 rounded-xl text-sm font-medium text-gray-700 cursor-pointer outline-none focus:ring-2 focus:ring-rose-500/20 transition-all">
                                    <option>Last 30 Days</option>
                                    <option>Last 7 Days</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* === SECTION 3: TABLE === */}
                <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-gray-100/50 to-transparent pointer-events-none z-20 md:hidden" />
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left min-w-[1000px]">
                            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        <th className="px-6 py-4 w-10">
                                            <input
                                                type="checkbox"
                                                className="cursor-pointer w-4 h-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500 focus:ring-offset-0"
                                                checked={table.getIsAllRowsSelected()}
                                                onChange={table.getToggleAllRowsSelectedHandler()}
                                            />
                                        </th>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id} className="px-6 py-4 font-semibold tracking-wide whitespace-nowrap">
                                                {header.isPlaceholder ? null : (
                                                    <div
                                                        className={`flex items-center gap-2 group ${header.column.getCanSort() ? "cursor-pointer select-none" : ""}`}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                    >
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        <span className="flex flex-col text-gray-300">
                                                            {header.column.getIsSorted() === 'asc' ? <ChevronUp size={14} className="text-rose-600" />
                                                                : header.column.getIsSorted() === 'desc' ? <ChevronDown size={14} className="text-rose-600" />
                                                                    : <ChevronsUpDown size={14} className="transition-opacity" />}
                                                        </span>
                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className={`divide-y divide-gray-50 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
                                {table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={`relative group outline-none transition-all duration-200 border-b border-slate-100 last:border-0 hover:z-30 hover:bg-white hover:border-transparent hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] ${row.getIsSelected() ? "bg-rose-50/40 z-20 ring-1 ring-inset ring-rose-200/50" : "bg-transparent"}`}>
                                        <td className="relative px-6 py-4 w-10">
                                            <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all duration-200 ${row.getIsSelected() ? "bg-rose-500 opacity-100" : "bg-rose-500 opacity-0 group-hover:opacity-30"}`} />
                                            <input
                                                type="checkbox"
                                                className="cursor-pointer w-4.5 h-4.5 rounded-md border-slate-300 text-rose-600 transition-all duration-200 focus:ring-rose-500 focus:ring-offset-0 hover:border-rose-400"
                                                checked={row.getIsSelected()}
                                                disabled={!row.getCanSelect()}
                                                onChange={row.getToggleSelectedHandler()}
                                            />
                                        </td>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm leading-6 text-slate-600 transition-colors duration-200 group-hover:text-slate-900">
                                                <div className="flex items-center font-medium">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* === SECTION 4: PAGINATION === */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 border-t border-gray-100 bg-gray-50/30 text-sm text-gray-600">

                        {/* LEFT: Showing X of Y */}
                        <div className="text-gray-500 font-medium order-2 sm:order-1">
                            Showing <span className="text-gray-900 font-semibold">{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> to <span className="text-gray-900 font-semibold">{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}</span> of <span className="text-gray-900 font-semibold">{table.getFilteredRowModel().rows.length}</span> results
                        </div>

                        {/* MIDDLE: Pagination Controls */}
                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            <button
                                className="p-2 rounded-lg border border-gray-200 hover:bg-white hover:text-rose-600 hover:border-rose-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <span className="flex items-center gap-1 px-4 font-medium">
                                Page <span className="text-gray-900">{table.getState().pagination.pageIndex + 1}</span> of <span className="text-gray-900">{table.getPageCount()}</span>
                            </span>

                            <button
                                className="p-2 rounded-lg border border-gray-200 hover:bg-white hover:text-rose-600 hover:border-rose-200 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-all"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* RIGHT: Rows per page */}
                        <div className="flex items-center gap-2 order-3">
                            <span className="text-gray-500 hidden sm:inline">Rows per page:</span>
                            <select
                                value={table.getState().pagination.pageSize}
                                onChange={e => {
                                    table.setPageSize(Number(e.target.value))
                                }}
                                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block p-2 outline-none cursor-pointer hover:border-rose-200 transition-all"
                            >
                                {[5, 10, 15, 20, 25, 30, 35, 40, 50].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Table