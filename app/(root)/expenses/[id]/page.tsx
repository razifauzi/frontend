import { EditExpensesForm } from '@/components/expenses/edit-expenses-form'
import { fetchExpensesById } from '@/lib/spring-boot/api'
import { notFound } from 'next/navigation'

export default async function EditExpensesPage({ params }: { params: { id: string } }) {
  const expenses = await fetchExpensesById(params.id)

  if (!expenses) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Edit Expenses</h1>
       <EditExpensesForm expenses={expenses} />   
      </div>
  )
}

