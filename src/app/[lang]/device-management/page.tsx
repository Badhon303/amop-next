import { columns } from "@/app/[lang]/device-management/columns"
import { DataTable } from "@/app/[lang]/device-management/data-table-test"
import ReactQueryProvider from "@/lib/react-query-provider"
// import getData from "@/actions/getDevicesData"
// import getDeviceDataLocal from "@/actions/getDevicesDataLocal"

export default function DeviceManagement() {
  // const data = await getData()
  // const data = await getDeviceDataLocal()
  return (
    <ReactQueryProvider>
      <DataTable columns={columns} />
    </ReactQueryProvider>
  )
}
