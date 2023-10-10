"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname } from "next/navigation"
import { downloadToExcel } from "@/lib/xlsx"

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [filtering, setFiltering] = useState("")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const pageNumber = Number(searchParams.get("pageNumber"))

  //Changes the page number in the url
  const pageSetTo = (pageNumber: string) => {
    history.pushState(
      null,
      "",
      `${pathname}?${createQueryString("pageNumber", pageNumber)}`
    )
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  //Sets the page with given page number in the url
  useEffect(() => {
    const initialPageNumber = pageNumber ? pageNumber - 1 : 0
    if (initialPageNumber <= 1) {
      table.setPageIndex(0)
      pageSetTo("1")
    } else if (initialPageNumber >= table.getPageCount()) {
      table.setPageIndex(table.getPageCount() - 1)
      pageSetTo(`${table.getPageCount()}`)
    } else {
      table.setPageIndex(initialPageNumber)
    }
  }, [])

  const getSelectedRowData = table.getSelectedRowModel()
  const visibleColumns = table.getVisibleLeafColumns()

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          type="text"
          placeholder="Filter..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <Button
          onClick={() =>
            downloadToExcel(
              getSelectedRowData.flatRows as [],
              visibleColumns as []
            )
          }
          className="ml-auto"
        >
          Export
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-4">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) => {
                      column.toggleVisibility(!!value)
                      column.setFilterValue("")
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <div className="cursor-pointer">
                      {column.id === "iccid"
                        ? "ICCID"
                        : column.id === "imei"
                        ? "IMEI"
                        : column.id === "ip"
                        ? "IP Address"
                        : column.id === "mac"
                        ? "MAC Address"
                        : column.id === "license"
                        ? "License Status"
                        : column.id === "manufacturer"
                        ? "Device Manufacturer"
                        : column.id === "lastconnect"
                        ? "Last Connect"
                        : column.id}
                    </div>
                  </DropdownMenuCheckboxItem>
                )
              })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => table.toggleAllColumnsVisible(true)}
              onSelect={(e) => e.preventDefault()}
            >
              <div className="cursor-pointer">Select All</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  id="table-row"
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
              <TableRow id="table-row">
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
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex flex-col md:flex-row items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <button
            className="border rounded p-1"
            onClick={() => {
              table.setPageIndex(0)
              pageSetTo("1")
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              table.previousPage()
              pageSetTo(`${table.getState().pagination.pageIndex}`)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            id="next-page"
            onClick={() => {
              table.nextPage()
              pageSetTo(`${table.getState().pagination.pageIndex + 2}`)
            }}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
              pageSetTo(`${table.getPageCount()}`)
            }}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault()
              }
            }}
            placeholder={`${table.getState().pagination.pageIndex + 1}`}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              if (page < 0) {
                return false
              } else if (page >= table.getPageCount()) {
                table.setPageIndex(table.getPageCount() - 1)
                pageSetTo(`${table.getPageCount()}`)
              } else {
                table.setPageIndex(page)
                pageSetTo(`${page + 1}`)
              }
            }}
            onBlur={(e) => (e.target.value = "")}
            className="border p-1 rounded w-16 cursor-pointer"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
            table.setPageIndex(0)
            pageSetTo("1")
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
