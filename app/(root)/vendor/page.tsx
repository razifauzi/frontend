import HeaderBox from '@/components/HeaderBox'
import { VendorDataTable } from "@/components/vendor/vendor-data-table"
import { Toaster } from "@/components/ui/toaster"

export default function VendorsPage() {
  return (
    <div className="container mx-auto py-10">
        <HeaderBox title='Vendors Listing' subtext='See your vendor details'/>
        <VendorDataTable />
      <Toaster />
    </div>
  )
}
