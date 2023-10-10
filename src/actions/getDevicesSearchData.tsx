// import { Device } from "@/app/[lang]/device-management/columns"

export default async function getSearchData(options: { queryString: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/inventory/search/${options.queryString}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  const jsonResponse = await res.json()
  return jsonResponse
}
