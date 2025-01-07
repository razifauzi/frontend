'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {  updateVendor } from '@/lib/spring-boot/api'
import { toast } from '@/hooks/use-toast'
import { VendorForm } from './vendor-form'

export function EditVendorForm({ vendor }: { vendor: Vendors }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (formData: Vendors) => {
    setIsSubmitting(true)
    try {
      await updateVendor(vendor.id, formData)
      toast({
        title: 'Success',
        description: 'Vendor updated successfully',
      })
      router.push('/vendor')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update vendor',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <VendorForm initialValues={vendor} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
}

