"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname } from "next/navigation"
import { downloadToExcel } from "@/lib/xlsx"
import { useTableHandler } from "@/hooks/use-table-handler"

import { useQuery } from "@tanstack/react-query"

import {
  ColumnDef,
  // ColumnFiltersState,
  // SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getSortedRowModel,
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
}

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import getData from "@/actions/getDevicesData"
// import getSearchData from "@/actions/getDevicesSearchData"

export function DataTable<TData, TValue>({
  columns,
}: // data,
DataTableProps<TData, TValue>) {
  // const [sorting, setSorting] = useState<SortingState>([])
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [filtering, setFiltering] = useState("")
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const pageNumber = Number(searchParams.get("page"))
  const pageLimit = Number(searchParams.get("limit"))
  const { sortColumn, sortColumnOrder } = useTableHandler()
  // const [tableData, setTableData] = useState({ results: [], totalPages: 1 })
  const [pagination, setPagination] = useState({
    pageIndex: pageNumber <= 1 ? 1 : pageNumber,
    pageSize: pageLimit <= 1 ? 10 : pageLimit,
  })

  const queryOptions = {
    queryString: `page=${pagination.pageIndex}&limit=${pagination.pageSize}${
      sortColumnOrder && "&sortBy="
    }${sortColumnOrder && `${sortColumn}:${sortColumnOrder}`}`,
  }

  const defaultData = useMemo(() => [], [])

  const dataQuery = useQuery(
    ["tableData", queryOptions],
    async () => await getData(queryOptions),
    { keepPreviousData: true }
  )

  const table = useReactTable({
    // data: tableData.results ?? [],
    data: dataQuery.data?.results ?? defaultData,
    // pageCount: tableData.totalPages ?? 1,
    pageCount: dataQuery.data?.totalPages ?? 1,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      // sorting,
      // columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    getRowId: (row: any) => row.id,
  })

  //Changes the page number in the url
  const pageSetTo = (pageNumber: string, pageLimit: string) => {
    history.pushState(
      null,
      "",
      `${pathname}?${createQueryString({
        page: pageNumber,
        limit: pageLimit,
      })}`
    )
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (searchParams: { [name: string]: string }) => {
      const params = new URLSearchParams()
      for (const key in searchParams) {
        params.set(key, searchParams[key])
      }
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (
      dataQuery.data?.totalPages != 1 &&
      pageNumber > dataQuery.data?.totalPages
    ) {
      setPagination({
        pageIndex: dataQuery.data?.totalPages,
        pageSize: 10,
      })
    } else if (pageLimit > 500) {
      setPagination({
        pageIndex: table.getState().pagination.pageIndex,
        pageSize: 10,
      })
    }
  }, [dataQuery.data?.totalPages])

  useEffect(() => {
    pageSetTo(
      `${table.getState().pagination.pageIndex}`,
      `${table.getState().pagination.pageSize}`
    )
  }, [pagination, sortColumnOrder])

  const getSelectedRowData = table.getSelectedRowModel()
  const visibleColumns = table.getVisibleLeafColumns()

  console.log("getSelectedRowData: ", getSelectedRowData)

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
        {dataQuery.data?.totalResults} row(s) selected.
      </div>
      <div className="flex flex-col md:flex-row items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <button
            className="border rounded p-1"
            onClick={() => {
              table.setPageIndex(1)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              table.previousPage()
            }}
            disabled={table.getState().pagination.pageIndex === 1}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            id="next-page"
            onClick={() => {
              // table.nextPage()
              if (
                table.getState().pagination.pageIndex ===
                table.getPageCount() - 1
              ) {
                setPagination({
                  pageIndex: dataQuery.data?.totalPages,
                  pageSize: table.getState().pagination.pageSize,
                })
              } else {
                table.nextPage()
              }
            }}
            // disabled={!table.getCanNextPage()}
            disabled={
              table.getState().pagination.pageIndex >= table.getPageCount()
            }
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => {
              // table.setPageIndex(table.getPageCount())
              setPagination({
                pageIndex: dataQuery.data?.totalPages,
                pageSize: table.getState().pagination.pageSize,
              })
            }}
            // disabled={!table.getCanNextPage()}
            disabled={
              table.getState().pagination.pageIndex >= table.getPageCount()
            }
          >
            {">>"}
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex} of{" "}
            {table.getPageCount() <= 1 ? 1 : table.getPageCount()}
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
            placeholder={`${table.getState().pagination.pageIndex}`}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) : 1
              if (page < 1) {
                return false
              } else if (page >= table.getPageCount()) {
                setPagination({
                  pageIndex: dataQuery.data?.totalPages,
                  pageSize: table.getState().pagination.pageSize,
                })
              } else {
                table.setPageIndex(page)
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
            table.setPageIndex(1)
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
