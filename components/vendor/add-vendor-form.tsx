'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createVendor } from '@/lib/spring-boot/api'
import { VendorForm } from '@/components/vendor/vendor-form'
import { toast } from '@/hooks/use-toast'

export function AddVendorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Vendors) => {
    setIsSubmitting(true)
    try {
      await createVendor(formData)
      toast({
        title: 'Success',
        description: 'Vendor added successfully',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error', 
        description: 'Failed to add vendor',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <VendorForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

