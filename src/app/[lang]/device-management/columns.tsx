"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableSort } from "./components/sorting-header"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// This type is used to define the shape of the data.
export type Device = {
  results: [
    {
      id: string
      provider: string
      customer: string
      iccid: number
      imei: number
      ip: string
      mac: string
      license: string
      manufacturer: string
      status: "Active" | "Suspended" | "Deactive"
      lastconnect: string
    }
  ]
}

export const columns: ColumnDef<Device>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex flex-row items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <ChevronDownIcon className="ml-2" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex items-center space-x-2 p-3">
              <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) =>
                  table.toggleAllRowsSelected(!!value)
                }
                id="Select_All"
              />

              <label
                htmlFor="Select_All"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Select All
              </label>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          console.log("row: ", row)
          row.toggleSelected(!!value)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => {
      return <DataTableSort column={column} title="Provider" />
    },
    cell: ({ row }) => {
      const provider = row.getValue("provider")
      return (
        <div className="flex justify-center w-16 h-8 relative">
          <Image
            // className="object-contain"
            src={`/${provider}.png`}
            alt="provider"
            fill
          />
        </div>
      )
    },
  },
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return <DataTableSort column={column} title="Customer" />
    },
    cell: ({ row }) => {
      const customer = row.getValue("customer") as string
      return <p>{customer}</p>
    },
  },
  {
    accessorKey: "iccid",
    header: ({ column }) => {
      return <DataTableSort column={column} title="ICCID" />
    },
    cell: ({ row }) => {
      const iccid = row.getValue("iccid") as string
      return <p className="break-all">{iccid}</p>
    },
  },
  {
    accessorKey: "imei",
    header: ({ column }) => {
      return <DataTableSort column={column} title="IMEI" />
    },
  },
  {
    accessorKey: "ip",
    header: ({ column }) => {
      return <DataTableSort column={column} title="IP Address" />
    },
  },
  {
    accessorKey: "mac",
    header: ({ column }) => {
      return <DataTableSort column={column} title="MAC Address" />
    },
  },
  {
    accessorKey: "license",
    header: ({ column }) => {
      return <DataTableSort column={column} title="License Status" />
    },
    cell: ({ row }) => {
      const license = row.getValue("license") as string
      return (
        <div className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <div
                  className={`w-6 h-6 rounded-full ${
                    license === "License Expired"
                      ? "bg-red-500"
                      : license === "License Expires in 30 days or less"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <div>
                  <p>
                    <span className="font-bold">Status: </span>Active
                  </p>
                  <p>
                    <span className="font-bold">Last Updated: </span>
                    2023-07-21 16:04:44
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => {
      return <DataTableSort column={column} title="Device Manufacturer" />
    },
    cell: ({ row }) => {
      const mfg = row.getValue("manufacturer")
      return (
        <div className="flex justify-center w-16 h-8 relative">
          <Image
            // className="object-contain"
            src={`/${mfg}.png`}
            alt="Device Manufacturer"
            fill
          />
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableSort column={column} title="Status" />
    },
  },
  {
    accessorKey: "lastconnect",
    header: ({ column }) => {
      return <DataTableSort column={column} title="Last Connect" />
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Archive Device</DropdownMenuItem>
            <DropdownMenuItem>Provision Device</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
