import { EditIncomeForm } from '@/components/income/edit-income-form'
import { fetchIncomeById } from '@/lib/spring-boot/api'
import { notFound } from 'next/navigation'

export default async function EditIncomePage({ params }: { params: { id: string } }) {
  const income = await fetchIncomeById(params.id)

  if (!income) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Edit Income</h1>
      <EditIncomeForm income={income} />
    </div>
  )
}

