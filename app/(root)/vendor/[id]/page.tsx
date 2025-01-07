import { EditVendorForm } from '@/components/vendor/edit-vendor-form'
import { fetchVendorById } from '@/lib/spring-boot/api'
import { notFound } from 'next/navigation'

export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await fetchVendorById(params.id)

  if (!vendor) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Edit Vendors</h1>
       <EditVendorForm vendor={vendor} />   
      </div>
  )
}

