'use client'

import { DynamicForm, FieldConfig } from '@/components/dynamics-form'
import { paymentMethodOptions,expensesOptions } from '@/lib/utils';
import { expensesSchema } from '@/lib/utils';

const expensesFields: FieldConfig[] = [
  {
    name: 'name',
    label: 'Expenses Name',
    type: 'text',
    placeholder: 'e.g. Salary, Freelance, Investments',
    description: 'Enter your expenses name.',
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    description: 'Enter the amount of expenses.',
  },
  {
    name: 'frequency',
    label: 'Frequency',
    type: 'number',
    placeholder: '0',
    description: 'How often do you receive this income?',
  },
  {
    name: 'issuedts',
    label: 'Date and Time Received',
    type: 'datetime',
    description: 'When did you issued this expenses?',
  },
  {
    name: 'paymentMethod',
    label: 'Payment Method',
    type: 'select',
    options: paymentMethodOptions.map(option => ({
      value: option.key,
      label: option.label,
    })),
    description: 'How was this expenses been paid?',
  },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: expensesOptions.map(option => ({
      value: option.key,
      label: option.label,
    })),
    description: '',
  },
  {
    name: 'fileName',
    label: 'filename Source',
    type: 'text',
    placeholder: '',
    description: 'Enter the source of your expenses.',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Add any additional details about this income',
    description: 'Optional: Provide more details about this income.',
  },
]

type ExpensesFormProps = {
  initialValues?: Expenses
  onSubmit: (data: Expenses) => void
  isSubmitting: boolean
}

export function ExpensesForm({ initialValues, onSubmit, isSubmitting }: ExpensesFormProps) {
  return (
    <DynamicForm
      fields={expensesFields}
      schema={expensesSchema}
      onSubmit={onSubmit}
      initialValues={initialValues}
      isSubmitting={isSubmitting}
    />
  )
}

