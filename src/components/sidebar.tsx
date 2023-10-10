"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { useSidebarHandler } from "@/hooks/use-sidebar-handler"
import Menus from "@/constants/submenuList"

export default function Sidebar() {
  const {
    open,
    subMenuOpen,
    nestedSubMenuOpen,
    indexNumber,
    nestedIndexNumber,
    setSubMenuOpen,
    setIndexNumber,
    setNestedSubMenuOpen,
    setNestedIndexNumber,
  } = useSidebarHandler()
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div
      className={`${
        open ? "w-[219px]" : "w-[70px]"
      } border-r-[1px] border-[#eaeaea] h-screen duration-300`}
    >
      <div className={`${open ? "px-[25px]" : "px-[15px]"}  py-[21px]`}>
        {open ? (
          <Image src="/amop-core.png" alt="logo" width={169} height={64} />
        ) : (
          <h1 className="font-bold text-xs">AMOP</h1>
        )}
      </div>
      <div>
        <ul className="">
          {Menus.map((menu, index) => (
            <div key={index}>
              <li className="">
                <Link
                  href={`${menu.submenu ? "" : menu.url}`}
                  className="pl-[25px] pr-[33px] pt-[13px] pb-[10px] border-b-[1px] border-[#eaeaea] hover:text-white focus-within:text-white hover:bg-[#aec2cc] focus-within:bg-[#00c2f3] flex items-center gap-x-2 cursor-pointer"
                  onClick={() => {
                    open && menu.submenu && setSubMenuOpen()
                    open && setIndexNumber(index)
                  }}
                  onMouseEnter={() => {
                    !open && setIsHovering(true)
                    !open && setIndexNumber(index)
                  }}
                  onMouseLeave={() => {
                    !open && setIsHovering(false)
                  }}
                >
                  <span className="block float-left">
                    <div>{menu.icon}</div>
                  </span>
                  <span
                    className={`text-xs flex-1 leading-[17.143px] tracking-[.5px] font-semibold pl-[2px] pt-[2px] ${
                      !open && "scale-0"
                    }`}
                  >
                    {menu.title}
                  </span>
                  {menu.submenu ? (
                    <ChevronRight
                      className={`w-[10px] h-[10px] ${
                        subMenuOpen && indexNumber === index && "rotate-90"
                      } `}
                    />
                  ) : null}
                </Link>
              </li>
              {indexNumber === index && subMenuOpen && menu.submenu && open ? (
                <div className="bg-[#f7f9fa]">
                  <ul className="">
                    {menu.submenuItems.map((submenuItem, index) => (
                      <div key={index}>
                        <li className="border-b-[1px] border-[#eaeaea] hover:text-white focus-within:text-white hover:bg-[#aec2cc] focus-within:bg-[#00c2f3]">
                          <Link
                            href={`${submenuItem.url}`}
                            className="flex items-center gap-x-2 cursor-pointer pl-[52px] pr-[35px] pt-[13px] pb-[12px]"
                            onClick={() => {
                              submenuItem.nestedSubmenu &&
                                setNestedSubMenuOpen()
                              setNestedIndexNumber(index)
                            }}
                          >
                            <span
                              className={`text-xs flex-1 leading-[17.143px] tracking-[.5px] font-semibold ${
                                !open && "scale-0"
                              }`}
                            >
                              {submenuItem.title}
                            </span>
                            {submenuItem.nestedSubmenu ? (
                              <ChevronRight
                                className={`w-[10px] h-[10px] ${
                                  nestedSubMenuOpen &&
                                  nestedIndexNumber === index &&
                                  "rotate-90"
                                }`}
                              />
                            ) : null}
                          </Link>
                        </li>
                        {nestedIndexNumber === index &&
                        nestedSubMenuOpen &&
                        submenuItem.nestedSubmenu &&
                        open ? (
                          <div className="bg-[#f7f9fa]">
                            <ul className="">
                              {submenuItem.nestedSubmenuItems.map(
                                (nestedSubmenuItem, index) => (
                                  <div key={index}>
                                    <li className="border-b-[1px] border-[#eaeaea] hover:text-white focus-within:text-white hover:bg-[#aec2cc] focus-within:bg-[#00c2f3] active:bg-[#00c2f3]">
                                      <Link
                                        href={``}
                                        className="flex items-center gap-x-2 cursor-pointer pl-[62px] pr-[35px] pt-[13px] pb-[12px]"
                                      >
                                        <span
                                          className={`text-xs leading-[17.143px] tracking-[.5px] font-semibold ${
                                            !open && "scale-0"
                                          }`}
                                        >
                                          {nestedSubmenuItem.title}
                                        </span>
                                      </Link>
                                    </li>
                                  </div>
                                )
                              )}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </ul>
                </div>
              ) : null}
              {indexNumber === index && menu.submenu && !open && isHovering ? (
                <div
                  className="relative"
                  onMouseEnter={() => {
                    setIsHovering(true)
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false)
                  }}
                >
                  <div className="absolute -top-10 left-[69px] w-[150px]">
                    <div className="relative z-50 bg-[#f7f9fa]">
                      <ul className="">
                        {menu.submenuItems.map((submenuItem, index) => (
                          <div key={index}>
                            <li className="px-3">
                              <Link
                                href={`${submenuItem.url}`}
                                className="flex items-center gap-x-2 cursor-pointer border-b-[1px] hover:rounded-md hover:text-white focus-within:text-white hover:bg-[#aec2cc] focus-within:bg-[#00c2f3]"
                                onClick={() => {
                                  submenuItem.nestedSubmenu &&
                                    setNestedSubMenuOpen()
                                  setNestedIndexNumber(index)
                                }}
                              >
                                <span
                                  className={`text-xs flex-1 leading-[17.143px] tracking-[.5px] font-semibold px-5 py-3`}
                                >
                                  {submenuItem.title}
                                </span>
                                {submenuItem.nestedSubmenu ? (
                                  <ChevronRight
                                    className={`w-[10px] h-[10px] ${
                                      nestedSubMenuOpen &&
                                      nestedIndexNumber === index &&
                                      "rotate-90"
                                    }`}
                                  />
                                ) : null}
                              </Link>
                            </li>
                            {nestedIndexNumber === index &&
                            nestedSubMenuOpen &&
                            submenuItem.nestedSubmenu &&
                            !open &&
                            isHovering ? (
                              <div className="bg-[#f7f9fa]">
                                <ul className="">
                                  {submenuItem.nestedSubmenuItems.map(
                                    (nestedSubmenuItem, index) => (
                                      <div key={index}>
                                        <li className="px-3 border-b-[1px]">
                                          <Link
                                            href={``}
                                            className="flex items-center gap-x-2 cursor-pointer hover:rounded-md border-[#eaeaea] hover:text-white focus-within:text-white hover:bg-[#aec2cc] focus-within:bg-[#00c2f3]"
                                          >
                                            <span
                                              className={`text-xs leading-[17.143px] tracking-[.5px] font-semibold px-5 py-3`}
                                            >
                                              {nestedSubmenuItem.title}
                                            </span>
                                          </Link>
                                        </li>
                                      </div>
                                    )
                                  )}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
