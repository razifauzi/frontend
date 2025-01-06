import { AddIncomeForm } from '@/components/income/add-income-form'

export default function AddIncomePage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Add New Income</h1>
      <AddIncomeForm />
    </div>
  )
}