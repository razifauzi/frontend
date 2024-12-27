import { DataTable } from '@/components/DataTable'
import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <div className='transactions'>
      <div className="transactions-header">
        <HeaderBox title='Expenses Listing' subtext='See your bank details'/>
      </div>
      <section className='flex w-full flex-col gap-6'>
        <DataTable type='expenses'/>
      </section>
    </div>
  )
}

export default TransactionHistory
