'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createIncome } from '@/lib/spring-boot/api'
import { IncomeForm } from '@/components/income/income-form'
import { toast } from '@/hooks/use-toast'

export function AddIncomeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Income) => {
    setIsSubmitting(true)
    try {
      await createIncome(formData)
      toast({
        title: 'Success',
        description: 'Income added successfully',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error', 
        description: 'Failed to add income',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <IncomeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

