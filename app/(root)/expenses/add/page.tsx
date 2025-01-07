import { AddExpensesForm } from '@/components/expenses/add-expenses-form'

export default function AddExpensesPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Add New Expenses</h1>
      <AddExpensesForm />
    </div>
  )
}