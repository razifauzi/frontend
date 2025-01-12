'use client'

import { DynamicForm, FieldConfig } from '@/components/dynamics-form'
import { incomeOptions } from '@/lib/utils';
import { incomeSchema } from '@/lib/utils';

const incomeFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Income Source',
    type: 'text',
    placeholder: 'e.g. Salary, Freelance, Investments',
    description: 'Enter the source of your income.',
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    description: 'Enter the amount of income.',
  },
  {
    name: 'frequency',
    label: 'Frequency',
    type: 'number',
    placeholder: '0',
    description: 'How often do you receive this income?',
  },
  {
    name: 'receivedts',
    label: 'Date and Time Received',
    type: 'datetime',
    description: 'When did you receive this income?',
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    options: [
      { value: '1', label: 'Direct Deposit' },
      { value: '2', label: 'Check' },
      { value: '3', label: 'Cash' },
      { value: '4', label: 'Other' },
    ],
    description: 'How was this income paid to you?',
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: incomeOptions.map(option => ({
      value: option.key,
      label: option.label,
    })),
    description: 'How was this income paid to you?',
  },
  {
    name: 'fileName',
    label: 'filename Source',
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
  // {
  //   name: 'fileName',
  //   label: 'Attachment', 
  //   type: 'file',
  //   accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  //   description: 'Upload any relevant documents (e.g., pay stub, invoice)',
  // },
]

type IncomeFormProps = {
  initialValues?: Income
  onSubmit: (data: Income) => void
  isSubmitting: boolean
}

export function IncomeForm({ initialValues, onSubmit, isSubmitting }: IncomeFormProps) {
  return (
    <DynamicForm
      fields={incomeFields}
      schema={incomeSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
    />
  )
}

