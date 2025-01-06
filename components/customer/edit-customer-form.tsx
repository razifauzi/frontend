'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateCustomer } from '@/lib/spring-boot/api'
import { toast } from '@/hooks/use-toast'
import { CustomerForm } from './customer-form'

export function EditCustomerForm({ customer }: { customer: Customers }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Customers) => {
    setIsSubmitting(true)
    try {
      await updateCustomer(customer.id, formData)
      toast({
        title: 'Success',
        description: 'Customer updated successfully',
      })
      router.push('/income')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update customer',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <CustomerForm initialValues={customer} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

