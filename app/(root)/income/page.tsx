import HeaderBox from '@/components/HeaderBox'
import { IncomeDataTable } from "@/components/income/income-data-table"
import { Toaster } from "@/components/ui/toaster"

export default function IncomePage() {
  return (
    <div className="container mx-auto py-10">
        <HeaderBox title='Income Listing' subtext='See your income details'/>
        <IncomeDataTable />
      <Toaster />
    </div>
  )
}
