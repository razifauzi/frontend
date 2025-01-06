import HeaderBox from '@/components/HeaderBox'
import { CustomerDataTable } from "@/components/customer/customer-data-table"
import { Toaster } from "@/components/ui/toaster"

export default function CustomerPage() {
  return (
    <div className="container mx-auto py-10">
        <HeaderBox title='Customer Listing' subtext='See your customer details'/>
        <CustomerDataTable />
      <Toaster />
    </div>
  )
}
