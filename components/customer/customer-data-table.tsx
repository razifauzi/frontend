"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { customerTypeOptions } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DynamicDataTable } from "@/components/data-table"
import * as React from 'react';
import { useEffect, useState } from "react"
import { fetchCustomers, fetchIncomes} from '@/lib/spring-boot/api'
import { Badge } from "@/components/ui/badge" 
import Link from "next/link";


const getCustomerTypeLabel = (type: string): string => {
  const options = customerTypeOptions ;
  const option = options.find((option) => option.key === type);
  return option ? option.label : type; 
};

const badgeStyles: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
}

export const columns: ColumnDef<Customers>[] = [
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
    accessorKey: "customerType",
    header: "Customer Type",
    cell: ({ row }: { row: any })  => {
      const rawValue = row.getValue("customerType") as string;
      const displayValue = getCustomerTypeLabel(rawValue); 
      return <div className="text-left">{displayValue}</div>;
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }: { row: any }) => {
      const customerId = row.original.id; 
      return (
        <Link href={`/customer/${customerId}`} className="text-blue-600 hover:underline">
          {row.getValue("displayName")}
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
    accessorKey: "email",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "mobileNo",
    header: ({ column }: { column: any }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Mobile No
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => <div className="text-left">{row.getValue("mobileNo")}</div>,
  },
]

export function CustomerDataTable() {
  const [customerData, setCustomerData] = useState<Customers[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch the income data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCustomers()
        setCustomerData(data)
      } catch (err) {
        setError('Failed to fetch customer data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleAddCustomer = (newCustomer: Customers) => {
    setCustomerData([...customerData, newCustomer])
  }

  return (
    <div>
      <DynamicDataTable 
        columns={columns} 
        data={customerData} 
        filterColumn="source"
        linkColumn=""
        linkPrefix="/customer"
        dynamicPath="customer"
        />
    </div>
  )
}

