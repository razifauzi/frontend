import { AddCustomerForm } from '@/components/customer/add-customer-form'

export default function AddCustomerPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Add New Customer</h1>
      <AddCustomerForm />
    </div>
  )
}