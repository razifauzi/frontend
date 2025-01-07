'use client'

import { DynamicForm, FieldConfig } from '@/components/dynamics-form'
import { vendorSchema } from '@/lib/utils';

const vendorFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Income Source',
    type: 'text',
    placeholder: 'e.g. Salary, Freelance, Investments',
    description: 'Enter the source of your income.',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Add any additional details about this income',
    description: 'Optional: Provide more details about this income.',
  },
  {
    name: 'fileName',
    label: 'filename Source',
    type: 'text',
    placeholder: 'e.g. Salary, Freelance, Investments',
    description: 'Enter the source of your income.',
  },
  // {
  //   name: 'fileName',
  //   label: 'Attachment',q  
  //   type: 'file',
  //   accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  //   description: 'Upload any relevant documents (e.g., pay stub, invoice)',
  // },
]

type VendorFormProps = {
  initialValues?: Vendors
  onSubmit: (data: Vendors) => void
  isSubmitting: boolean
}

export function VendorForm({ initialValues, onSubmit, isSubmitting }: VendorFormProps) {
  return (
    <DynamicForm
      fields={vendorFields}
      schema={vendorSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
    />
  )
}

