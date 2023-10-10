import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { i18n } from "../../i18n-config"

// import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import type { Metadata } from "next"
// import { Inter } from "next/font/google"
import localFont from "next/font/local"

// const inter = Inter({ subsets: ["latin"] })
const muliFont = localFont({
  src: "../../public/fonts/Muli-Regular.ttf",
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: "Device Management Inventory",
  description: "Device Management Inventory",
  viewport:
    // "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    "width=device-width, minimum-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className={muliFont.className}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 h-[76px] border-b-[1px] border-[#eaeaea]">
            <Header />
            <div className="p-3">{children}</div>
          </div>
        </div>
      </body>
    </html>
  )
}
