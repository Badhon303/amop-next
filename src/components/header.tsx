"use client"

import { Menu, User2 } from "lucide-react"
import { useSidebarHandler } from "@/hooks/use-sidebar-handler"

export default function Header() {
  const { setOpen } = useSidebarHandler()
  return (
    // <div className="flex-1 h-[76px] border-b-[1px] border-[#eaeaea]">
    // <div className="flex h-full items-center justify-between">
    <div className="flex h-full items-center justify-between">
      <div className="flex px-10">
        <button
          className="flex justify-center items-center rounded-lg w-10 h-8 bg-[#00c2f3]"
          onClick={() => setOpen()}
        >
          <Menu className="w-4 h-4 text-[#fff]" />
        </button>
        <h1 className="ml-4 text-2xl">Inventory</h1>
      </div>
      <div className="flex items-center px-10">
        <div className="mr-1">
          <h1 className="font-bold text-xs text-[#00c2f3]">Admin@admin.com</h1>
          <h1 className="text-right text-xs text-[#00c2f3]">Super Admin</h1>
        </div>
        <button className="flex justify-center items-center">
          <User2 className="w-8 h-8 text-[#00c2f3]" />
        </button>
        <div className="ml-24 w-6 h-6 text-center rounded-full ring-2 ring-[#00c2f3]">
          <h1 className=" text-[#00c2f3] text-2xl font-bold">?</h1>
        </div>
      </div>
    </div>
    // </div>
    // </div>
  )
}
