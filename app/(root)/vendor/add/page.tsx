import { AddVendorForm } from '@/components/vendor/add-vendor-form'

export default function AddVendorPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Add New Vendor</h1>
      <AddVendorForm />
    </div>
  )
}