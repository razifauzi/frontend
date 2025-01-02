"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge" 
import { incomeOptions, expensesOptions } from '@/lib/utils';
import { fetchIncomes, fetchExpenses,fetchCustomers,fetchVendors } from '@/lib/spring-boot/api'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const badgeStyles: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
}

const getProgramLabel = (program: string, type: TableType): string => {
  const options = type === 'income' ? incomeOptions : expensesOptions;
  const option = options.find((option) => option.key === program);
  return option ? option.label : program; // Fallback to raw value if not found
};

type TableType = 'income' | 'expenses' | 'customer' | 'vendor';

interface DataTableProps {
  type: TableType;
}

// Generic column definitions
const generateColumns = (type: TableType) => [
  {
    id: "select",
    header: ({ table }: { table: any }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: any }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdts",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const rawValue = row.getValue("createdts");
      const date = new Date(rawValue);

      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);

     // Format the time part (hh:mm:ss AM/PM)
      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Ensure AM/PM format
      }).format(date);

      const [month, day, year] = formattedDate.split(" ");
    
    return <div className="text-left">{`${day} ${month} ${year} ${formattedTime}`}</div>;
    },
  },  
  {
    accessorKey: type === 'income' ? "incomePrefix" : "expensesPrefix",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {type === 'income' ? 'Income No' : 'Expenses No'}
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue(type === 'income' ? "incomePrefix" : 'expensesPrefix')}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="lowercase text-left">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "program",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Program
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const rawValue = row.getValue("program") as string;
      const displayValue = getProgramLabel(rawValue, type); // Now 'type' is available
      return <div className="lowercase text-left">{displayValue}</div>;
    },
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
    cell: ({ row }: { row: any }) => {
      const frequency = row.getValue("frequency") as string;
      const style = badgeStyles[frequency] || "bg-gray-100 text-gray-800"; // Default style

      return (
        <Badge className={`capitalize ${style}`}>
          {frequency}
        </Badge>
      );
    }
  },
  
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }: { row: any }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }).format(amount);

      return <div className="font-semibold text-[#f00438] text-center ">{formatted}</div>;
    },
  },
];

export function DataTable({ type }: DataTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const router = useRouter()
  const columns = generateColumns(type);
  const fetchData = type === 'income' 
                  ? fetchIncomes 
                  : type === 'expenses' ? fetchExpenses 
                  : type === 'customer' ? fetchCustomers : fetchVendors;
  
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchData();
        setData(data);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error)
      }
    }

    loadData()
  }, [type])

  const totalAmount = data.reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter program..."
          value={(table.getColumn("program")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("program")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button variant="outline" onClick={() => router.push(`/${type}/add`)}>Add {type === 'income' ? 'Income' : 'Expense'}</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="destructive" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigator.clipboard.writeText(row.original.id)}
                        >
                          Copy program ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => router.push(`/${type}/${row.original.id}`)}
                        >
                          View {type === 'income' ? 'Income' : 'Expense'} details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-left font-semibold">
                Total Amount
              </TableCell>
              <TableCell className="text-center font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "MYR",
                }).format(totalAmount)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex justify-between py-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
