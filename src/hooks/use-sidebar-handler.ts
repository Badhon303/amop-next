import { create } from "zustand"

interface useSidebarHandlerStore {
  open: boolean
  subMenuOpen: boolean
  nestedSubMenuOpen: boolean
  indexNumber: number
  nestedIndexNumber: number
  setOpen: () => void
  setSubMenuOpen: () => void
  setNestedSubMenuOpen: () => void
  setIndexNumber: (indexId: number) => void
  setNestedIndexNumber: (indexId: number) => void
}

export const useSidebarHandler = create<useSidebarHandlerStore>((set) => ({
  open: true,
  subMenuOpen: false,
  nestedSubMenuOpen: false,
  indexNumber: 0,
  nestedIndexNumber: 0,
  setOpen: () => set((state) => ({ open: !state.open })),
  setSubMenuOpen: () => set((state) => ({ subMenuOpen: !state.subMenuOpen })),
  setNestedSubMenuOpen: () =>
    set((state) => ({ nestedSubMenuOpen: !state.nestedSubMenuOpen })),
  setIndexNumber: (indexId: number) => set(() => ({ indexNumber: indexId })),
  setNestedIndexNumber: (indexId: number) =>
    set(() => ({ nestedIndexNumber: indexId })),
}))
