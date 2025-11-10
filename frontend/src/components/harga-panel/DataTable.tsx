/** biome-ignore lint/a11y/noLabelWithoutControl: <false positive> */
/** biome-ignore lint/suspicious/noExplicitAny: <false positive> */
/** biome-ignore lint/a11y/noStaticElementInteractions: <false positive> */
/** biome-ignore lint/a11y/useKeyWithClickEvents: <false positive> */

"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "classnames";
import React, { useMemo, useState } from "react";

/** Dummy data type */
type Order = {
  id: string;
  vehicle: string;
  type: "Repair" | "Replacement";
  status: "Repairing" | "Finished" | "Rejected";
  amount: number;
  createdAt: string;
};

/** Currency formatter */
const formatCurrency = (m: number) => `Rp ${m.toLocaleString()}M`;

/** Dummy data generator */
function makeData(): Order[] {
  const statuses = ["Repairing", "Finished", "Rejected"] as const;
  const types = ["Repair", "Replacement"] as const;
  const vehicles = [
    "Toyota Avanza",
    "Honda Jazz",
    "Nissan X-Trail",
    "Suzuki Ertiga",
    "Mazda CX-5",
    "Mitsubishi Pajero",
  ];
  const data: Order[] = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: `#${2041 - i}`,
      vehicle: vehicles[i % vehicles.length],
      type: types[i % types.length],
      status: statuses[i % statuses.length],
      amount: Math.floor(Math.random() * 30) + 10,
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    });
  }
  return data;
}

export default function DataTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const data = useMemo(() => makeData(), []);

  const columns = useMemo<ColumnDef<Order, any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Order",
        cell: (info) => <div className="font-medium">{info.getValue()}</div>,
      },
      {
        accessorKey: "vehicle",
        header: "Vehicle",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const val = info.getValue() as Order["status"];
          const colors =
            val === "Finished"
              ? "bg-green-100 text-green-800"
              : val === "Repairing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800";
          return (
            <span
              className={clsx(
                "px-2 py-1 rounded-full text-xs font-medium",
                colors,
              )}
            >
              {val}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => formatCurrency(info.getValue() as number),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: { pageIndex, pageSize },
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex ?? pageIndex);
        setPageSize(updater.pageSize ?? pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div
      className="rounded-lg p-4"
      style={{ background: "var(--metallic-blue-gradient)" }}
    >
      {/* Toolbar: search + page size */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <input
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search orders, vehicles, types..."
            className="px-3 py-2 rounded-md w-64 text-sm text-white font-semibold"
            style={{ border: "2px solid var(--floral-white)" }}
          />
          <div className="text-sm text-white">
            Results: {table.getFilteredRowModel().rows.length}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-white" htmlFor="paginationSelect">
            Page size
          </label>
          <select
            value={pageSize}
            onChange={(e) => {
              const v = Number(e.target.value);
              setPageSize(v);
              table.setPageSize(v);
            }}
            className="px-2 py-1 border rounded-md text-sm text-white cursor-pointer"
            style={{
              border: "2px solid var(--floral-white)",
              background: "var(--prussian-blue)",
            }}
          >
            {[5, 10, 15, 20, 25].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[var(--floral-white)]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      style={{ textAlign: "left" }}
                      className="px-3 py-2 text-sm font-medium text-gray-700"
                    >
                      {/* Sortable header with keyboard access */}
                      <button
                        type="button"
                        tabIndex={0}
                        className={clsx(
                          "flex items-center gap-2 select-none text(--prussian-blue)",
                          canSort ? "cursor-pointer" : "",
                        )}
                        onClick={() =>
                          canSort &&
                          header.column.toggleSorting(
                            header.column.getIsSorted() === "asc",
                          )
                        }
                        onKeyDown={(e) => {
                          if (!canSort) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc",
                            );
                          }
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {canSort && (
                          <span className="text-xs text-gray-500">
                            {sortState === "asc"
                              ? " ▲"
                              : sortState === "desc"
                                ? " ▼"
                                : " ↕"}
                          </span>
                        )}
                      </button>

                      {/* Per-column filter */}
                      {header.column.getCanFilter() && (
                        <div className="mt-2">
                          <input
                            type="text"
                            value={
                              (header.column.getFilterValue() as string) ?? ""
                            }
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            placeholder={`Filter ${header.column.columnDef.header}...`}
                            className="w-full px-2 py-1 border rounded text-sm"
                            style={{ borderColor: "var(--prussian-blue)" }}
                          />
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-3 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-white">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border-2 disabled:opacity-50 cursor-pointer"
            type="button"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 rounded border-2 disabled:opacity-50 cursor-pointer"
            type="button"
          >
            {"<"}
          </button>

          <span>
            Page <strong>{pageIndex + 1}</strong> of {table.getPageCount()}
          </span>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border-2 disabled:opacity-50 cursor-pointer"
            type="button"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 rounded border-2 disabled:opacity-50 cursor-pointer"
            type="button"
          >
            {">>"}
          </button>
        </div>

        <div>
          Showing {pageIndex * pageSize + 1}–
          {Math.min(
            (pageIndex + 1) * pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          of {table.getFilteredRowModel().rows.length}
        </div>
      </div>
    </div>
  );
}
