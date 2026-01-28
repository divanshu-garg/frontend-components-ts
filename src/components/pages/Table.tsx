// selection of row: console logs when updated. no useEffect here when action to perform via this it will happen via a button
// sorting state: will later on apply useEffect for api call when state is changed

// import React from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, type SortingState, useReactTable } from "@tanstack/react-table"
import { tableData, type TableData } from "../../utils/helper.ts"
import React, { useState } from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";

const columnHelper = createColumnHelper<TableData>()

// export interface TableData {
//     id: string,
//     customer: string,
//     city: string,
//     state: string,
//     orderDate: string,
//     amount: number,
//     status: string,
//     priority: string,
//     paymentMethod: string,
//     items: number
// }

const columns = [
    columnHelper.accessor('id', {
        header: "ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('customer', {
        header: "Customer",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('city', {
        header: "City",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('state', {
        header: "State",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('orderDate', {
        header: "Order Date",
        // cell: (info) => info.getValue(),
        cell: (info) => {
            const value = info.getValue();
            // Result: "15 Jan 2026"
            return new Date(value).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        },
    }),
    columnHelper.accessor('amount', {
        header: "Amount",
        // cell: (info) => info.renderValue(),
        cell: (info) => {
            const value = info.getValue();
            // Format as Indian Rupee
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(value);
        },
    }),
    columnHelper.accessor('status', {
        header: "Status",
        // cell: (info) => info.getValue(),
        cell: (info) => {
            const status = info.getValue();
            // Simple color mapping logic
            const colors: Record<string, string> = {
                "Delivered": "text-green-600 bg-green-100",
                "Pending": "text-yellow-600 bg-yellow-100",
                "Shipped": "text-blue-600 bg-blue-100",
                "Cancelled": "text-red-600 bg-red-100",
            };

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || "text-gray-600 bg-gray-100"}`}>
                    {status}
                </span>
            );
        },
    }),
    columnHelper.accessor('priority', {
        header: "Priority",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('paymentMethod', {
        header: "Payment Method",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('items', {
        header: "Items",
        cell: (info) => info.getValue(),
    })
]

const Table = () => {
    // useEffect for sorting api call to be added here

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, _setData] = useState<TableData[]>(tableData)
    const [sorting, setSorting] = useState<SortingState>([])
    const [rowSelection, setRowSelection] = useState({})
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, _setIsLoading] = useState(false);
    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            rowSelection,
        },
        getRowId: (row) => row.id,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        manualSorting: true,
    })

    console.log("Selected Row IDs:", rowSelection);
    return (
        <div className="p-2"> {/* Logic container */}
            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="w-full min-w-max text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                <th className="px-6 py-3 w-4">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300"
                                        checked={table.getIsAllRowsSelected()}
                                        onChange={table.getToggleAllRowsSelectedHandler()} // TanStack handles the logic
                                    />
                                </th>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-3 whitespace-nowrap">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={`flex items-center text-center gap-0 ${header.column.getCanSort()
                                                    ? "cursor-pointer select-none"
                                                    : ""
                                                    }`}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                <span className="mr-2">
                                                    {/* 1. If Ascending, show Up */}
                                                    {header.column.getCanSort() && header.column.getIsSorted() === 'asc' && <ChevronUp size={14} className="text-gray-500" />}

                                                    {/* 2. If Descending, show Down */}
                                                    {header.column.getCanSort() && header.column.getIsSorted() === 'desc' && <ChevronDown size={14} className="text-gray-500" />}

                                                    {/* 3. If Not Sorted, show Default */}
                                                    {header.column.getCanSort() && !header.column.getIsSorted() && <ChevronsUpDown size={14} className="text-gray-400" />}
                                                </span>

                                                {/* Header Text */}
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className={isLoading ? "opacity-50 pointer-events-none" : ""}>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 w-4">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer rounded border-gray-300"
                                        checked={row.getIsSelected()}
                                        disabled={!row.getCanSelect()}
                                        onChange={row.getToggleSelectedHandler()} // TanStack handles the logic
                                    />
                                </td>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="h-4" />
                <button onClick={() => rerender()} className="border p-2">
                    Rerender
                </button>
            </div>
        </div>
    )
}

export default Table