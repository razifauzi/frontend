'use client'

import { DynamicForm, FieldConfig } from '@/components/dynamics-form'
import { customerTypeOptions,salutationOptions } from '@/lib/utils';
import { customerSchema } from '@/lib/utils';

const customerFields: FieldConfig[] = [
  {
    name: 'salutation',
    label: 'Salutation',
    type: 'select',
    options: salutationOptions.map(option => ({
      value: option.key,
      label: option.label,
    })),
    description: '',
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'e.g. Muhammad Karim',
    description: 'Enter your first name.',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'e.g. Abdullah ',
    description: 'Enter your last name.',
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    placeholder: '',
    description: '',
  },
  {
    name: 'displayName',
    label: 'Display Name',
    type: 'text',
    placeholder: '',
    description: '',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: '',
    description: '',
  },
  {
    name: 'mobileNo',
    label: 'Mobile No',
    type: 'text',
    placeholder: '',
    description: '',
  },
  {
    name: 'customerType',
    label: 'Customer Type',
    type: 'select',
    options: customerTypeOptions.map(option => ({
      value: option.key,
      label: option.label,
    })),
    description: 'How was this income paid to you?',
  },
  {
    name: 'billingAddress',
    label: 'Billing Address',
    type: 'textarea',
    placeholder: '',
    description: '',
  },
  {
    name: 'shippingAddress',
    label: 'Shipping Address',
    type: 'textarea',
    placeholder: '',
    description: '',
  },
  {
    name: 'remarks',
    label: 'Remarks',
    type: 'textarea',
    placeholder: '',
    description: '',
  },
  {
    name: 'website',
    label: 'Website',
    type: 'text',
    placeholder: '',
    description: '',
  },
]

type CustomerFormProps = {
  initialValues?: Customers
  onSubmit: (data: Customers) => void
  isSubmitting: boolean
}

export function CustomerForm({ initialValues, onSubmit, isSubmitting }: CustomerFormProps) {
  return (
    <DynamicForm
      fields={customerFields}
      schema={customerSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
    />
  )
}

