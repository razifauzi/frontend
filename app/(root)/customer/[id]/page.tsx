import { EditCustomerForm } from '@/components/customer/edit-customer-form'
import { fetchCustomerById } from '@/lib/spring-boot/api'
import { notFound } from 'next/navigation'

export default async function EditCustomerPage({ params }: { params: { id: string } }) {
  const customer = await fetchCustomerById(params.id)

  if (!customer) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Edit customer</h1>
      <EditCustomerForm customer={customer} />
    </div>
  )
}

