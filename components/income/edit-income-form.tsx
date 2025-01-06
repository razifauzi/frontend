'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateIncome } from '@/lib/spring-boot/api'
import { IncomeForm } from '@/components/income/income-form'
import { toast } from '@/hooks/use-toast'

export function EditIncomeForm({ income }: { income: Income }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Income) => {
    setIsSubmitting(true)
    try {
      await updateIncome(income.id, formData)
      toast({
        title: 'Success',
        description: 'Income updated successfully',
      })
      router.push('/income')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update income',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <IncomeForm initialValues={income} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

