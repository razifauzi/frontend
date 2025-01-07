'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateExpenses } from '@/lib/spring-boot/api'
import { toast } from '@/hooks/use-toast'
import { ExpensesForm } from '@/components/expenses/expenses-form'

export function EditExpensesForm({ expenses }: { expenses: Expenses }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Expenses) => {
    setIsSubmitting(true)
    try {
      await updateExpenses(expenses.id,formData)
      toast({
        title: 'Success',
        description: 'Expenses updated successfully',
      })
      router.push('/expenses')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update expenses',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <ExpensesForm initialValues={expenses} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

