import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons"
import { Column } from "@tanstack/react-table"

import { useTableHandler } from "@/hooks/use-table-handler"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableSort<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { sortColumn, sortColumnOrder, setSortColumn, setSortColumnOrder } =
    useTableHandler()

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => {
          // column.toggleSorting()
          setSortColumn(`${column.id}`)
          if (sortColumnOrder === "") {
            setSortColumnOrder("asc")
          } else if (sortColumnOrder === "asc") {
            setSortColumnOrder("desc")
          } else {
            setSortColumnOrder("")
          }
        }}
      >
        <span>{title}</span>
        {sortColumnOrder === "desc" && sortColumn === column.id ? (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        ) : sortColumnOrder === "asc" && sortColumn === column.id ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
