import { DataTable } from '@/components/DataTable'
import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <div className='transactions'>
      <div className="transactions-header">
        <HeaderBox title='Vendor Listing' subtext='See your vendor details'/>
      </div>
      <section className='flex w-full flex-col gap-6'>
        <DataTable type="vendor" />
      </section>
    </div>
  )
}

export default TransactionHistory;
