"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { incomeOptions, expensesOptions } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DynamicDataTable } from "@/components/data-table"
import * as React from 'react';
import { useEffect, useState } from "react"
import { fetchIncomes, fetchVendors} from '@/lib/spring-boot/api'
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

export const columns: ColumnDef<Vendors>[] = [
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
         Vendors Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="lowercase text-left">{row.getValue("name")}</div>,
  },
]

export function VendorDataTable() {
  const [vendorData, setVendorData] = useState<Vendors[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch the vendor data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVendors()
        setVendorData(data)
      } catch (err) {
        setError('Failed to fetch vendor data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddIncome = (newVendor: Vendors) => {
    setVendorData([...vendorData, newVendor])
  }

  return (
    <div>
      <DynamicDataTable 
        columns={columns} 
        data={vendorData} 
        filterColumn="source"
        linkColumn=""
        linkPrefix="/vendor"
        dynamicPath="vendor"
        />
    </div>
  )
}

