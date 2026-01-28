// import React from 'react'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { tableData, type TableData } from "../../utils/helper.ts"
import React, { useState } from "react";

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [data, _setData] = useState<TableData[]>(tableData)
    const rerender = React.useReducer(() => ({}), {})[1]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="p-2"> {/* Logic container */}
            <div className="overflow-x-auto border rounded-lg shadow-sm">
                <table className="w-full min-w-max text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-6 py-3 whitespace-nowrap">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="">
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
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