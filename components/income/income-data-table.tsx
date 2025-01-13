"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { incomeOptions, expensesOptions } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DynamicDataTable } from "@/components/data-table"
import * as React from 'react';
import { useEffect, useState } from "react"
import { fetchIncomes} from '@/lib/spring-boot/api'
import { Badge } from "@/components/ui/badge" 
import Link from "next/link";


const getProgramLabel = (program: string): string => {
  const options = incomeOptions ;
  const option = options.find((option) => option.key === program);
  return option ? option.label : program; 
};

const badgeStyles: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
}

export const columns: ColumnDef<Income>[] = [
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
    accessorKey: "incomePrefix",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Income No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: any }) => {
      const incomeId = row.original.id; // Ensure `id` field is available
      return (
        <Link href={`/income/${incomeId}`} className="text-blue-600 hover:underline">
          {row.getValue("incomePrefix")}
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
      const displayValue = getProgramLabel(rawValue); 
      return <div className="text-left">{displayValue}</div>;
    },
  },
]

export function IncomeDataTable() {
  const [incomeData, setIncomeData] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch the income data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIncomes()
        setIncomeData(data)
      } catch (err) {
        setError('Failed to fetch income data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddIncome = (newIncome: Income) => {
    setIncomeData([...incomeData, newIncome])
  }

  return (
    <div>
      <DynamicDataTable 
        columns={columns} 
        data={incomeData} 
        linkColumn="incomePrefix"  // Ensure this matches the column id
        linkPrefix="/income"
        dynamicPath="income"
        // filterColumn="category"  // Set the filter column here
      />
    </div>
  )
}

