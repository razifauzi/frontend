'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createExpenses } from '@/lib/spring-boot/api'
import { ExpensesForm } from '@/components/expenses/expenses-form'
import { toast } from '@/hooks/use-toast'

export function AddExpensesForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Expenses) => {
    setIsSubmitting(true)
    try {
      await createExpenses(formData)
      toast({
        title: 'Success',
        description: 'Expenses added successfully',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error', 
        description: 'Failed to add expenses',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <ExpensesForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

