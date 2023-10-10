import { create } from "zustand"

interface useTableHandlerStore {
  sortColumn: string
  sortColumnOrder: string
  // selectedRows: []
  setSortColumn: (indexId: string) => void
  setSortColumnOrder: (indexId: string) => void
  // setSelectedRows: (index: []) => void
}

export const useTableHandler = create<useTableHandlerStore>((set) => ({
  // selectedRows: [],
  sortColumn: "",
  sortColumnOrder: "",
  setSortColumn: (sortId: string) => set(() => ({ sortColumn: sortId })),
  // setSelectedRows: (sortId: []) => set(() => ({ selectedRows: sortId })),
  setSortColumnOrder: (sortOrderId: string) =>
    set(() => ({ sortColumnOrder: sortOrderId })),
}))
