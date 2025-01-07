import HeaderBox from '@/components/HeaderBox'
import { ExpensesDataTable } from "@/components/expenses/expenses-data-table"
import { Toaster } from "@/components/ui/toaster"

export default function ExpensesPage() {
  return (
    <div className="container mx-auto py-10">
        <HeaderBox title='Expenses Listing' subtext='See your expenses details'/>
        <ExpensesDataTable />
      <Toaster />
    </div>
  )
}
