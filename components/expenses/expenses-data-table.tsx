"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { expensesOptions } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DynamicDataTable } from "@/components/data-table"
import * as React from 'react';
import { useEffect, useState } from "react"
import { fetchExpenses} from '@/lib/spring-boot/api'
import { Badge } from "@/components/ui/badge" 
import Link from "next/link";


const getCategoryLabel = (category: string): string => {
  const options = expensesOptions ;
  const option = options.find((option) => option.key === category);
  return option ? option.label : category; 
};

const badgeStyles: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
}

export const columns: ColumnDef<Expenses>[] = [
  {
    id: "select",
    header: ({ table }) => (
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
    accessorKey: "expensesPrefix",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expenses No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: any }) => {
      const expensesId = row.original.id; 
      return (
        <Link href={`/expenses/${expensesId}`} className="text-blue-600 hover:underline">
          {row.getValue("expensesPrefix")}
        </Link>
      );
    },
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
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }).format(amount)
      return <div className="font-semibold text-[#f00438] text-left ">{formatted}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }: { row: any })  => {
      const rawValue = row.getValue("category") as string;
      const displayValue = getCategoryLabel(rawValue); 
      return <div className="text-left">{displayValue}</div>;
    },
  },
]

export function ExpensesDataTable() {
  const [expensesData, setExpensesData] = useState<Expenses[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch the income data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExpenses()
        setExpensesData(data)
      } catch (err) {
        setError('Failed to fetch expenses data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddExpenses = (newExpenses: Expenses) => {
    setExpensesData([...expensesData, newExpenses])
  }

  return (
    <div>
      <DynamicDataTable 
        columns={columns} 
        data={expensesData} 
        filterColumn="source"
        linkColumn="expensesNo"
        linkPrefix="/expenses"
        dynamicPath="expenses"
        />
    </div>
  )
}

