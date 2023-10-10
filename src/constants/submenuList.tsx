import {
  FaHome,
  FaMobileAlt,
  FaCog,
  FaDollarSign,
  FaGlobeAsia,
  FaPhoneAlt,
  FaCogs,
  FaUsers,
} from "react-icons/fa"

import { MdRouter } from "react-icons/md"

import { RiWifiFill } from "react-icons/ri"

const Menus = [
  {
    title: "Dashboard",
    url: "/en/dashboard",
    icon: <FaHome className="w-[11px] h-[11px]" />,
    submenu: false,
    submenuItems: [],
  },
  {
    title: "M2M",
    url: "",
    icon: <RiWifiFill className="w-[13px] h-[13px]" />,
    submenu: true,
    submenuItems: [
      {
        title: "Inventory",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Bulk Change",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Carrier Rate Plans",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Customer Rate Plans",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Customer Rate Pools",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Revenue Assurance",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Reports",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
    ],
  },
  {
    title: "Mobility",
    url: "",
    icon: <FaMobileAlt className="w-[9px] h-[9px]" />,
    submenu: true,
    submenuItems: [
      {
        title: "Inventory",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Bulk Change",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Carrier Rate Plans",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Customer Rate Plans",
        url: "",
        nestedSubmenu: true,
        nestedSubmenuItems: [
          {
            title: "First nested",
            url: "",
          },
          {
            title: "First nested",
            url: "",
          },
        ],
      },
      {
        title: "Customer Rate Pools",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Revenue Assurance",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Reports",
        url: "",
        nestedSubmenu: true,
        nestedSubmenuItems: [
          {
            title: "First nested",
            url: "",
          },
          {
            title: "First nested",
            url: "",
          },
        ],
      },
    ],
  },
  {
    title: "Device Management",
    url: "",
    icon: <MdRouter className="w-3 h-3" />,
    submenu: true,
    submenuItems: [
      {
        title: "Inventory",
        url: "/en/device-management",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Provisioning",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Reports",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Revenue Assurance",
        url: "",
        nestedSubmenu: true,
        nestedSubmenuItems: [
          {
            title: "First nested",
            url: "",
          },
          {
            title: "First nested",
            url: "",
          },
        ],
      },
    ],
  },
  {
    title: "Optimization",
    url: "",
    icon: <FaCog className="w-[11px] h-[11px]" />,
    submenu: false,
    submenuItems: [],
  },
  {
    title: "Customer Charges",
    url: "",
    icon: <FaDollarSign className="w-[11px] h-[11px]" />,
    submenu: false,
    submenuItems: [],
  },
  {
    title: "NatSapiens",
    url: "",
    icon: <FaGlobeAsia className="w-[11px] h-[11px]" />,
    submenu: true,
    submenuItems: [
      { title: "Users", url: "", nestedSubmenu: false, nestedSubmenuItems: [] },
    ],
  },
  {
    title: "LNP",
    url: "",
    icon: <FaPhoneAlt className="w-[11px] h-[11px]" />,
    submenu: true,
    submenuItems: [
      {
        title: "Provider Charge Mapping",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Partners",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
    ],
  },
  {
    title: "Automation",
    url: "",
    icon: <FaCogs className="w-3 h-3" />,
    submenu: true,
    submenuItems: [
      {
        title: "Provider Charge Mapping",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
      {
        title: "Partners",
        url: "",
        nestedSubmenu: false,
        nestedSubmenuItems: [],
      },
    ],
  },
  {
    title: "People",
    url: "",
    icon: <FaUsers className="w-[11px] h-[11px]" />,
    submenu: true,
    submenuItems: [
      { title: "Users", url: "", nestedSubmenu: false, nestedSubmenuItems: [] },
    ],
  },
]

export default Menus
