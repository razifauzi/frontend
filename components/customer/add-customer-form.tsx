'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCustomer } from '@/lib/spring-boot/api'
import { CustomerForm } from '@/components/customer/customer-form'
import { toast } from '@/hooks/use-toast'

export function AddCustomerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Customers) => {
    setIsSubmitting(true)
    try {
      await createCustomer(formData)
      toast({
        title: 'Success',
        description: 'Customer added successfully',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error', 
        description: 'Failed to add customer',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <CustomerForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

