import { DataTable } from '@/components/DataTable'
import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <div className='transactions'>
      <div className="transactions-header">
        <HeaderBox title='Income Listing' subtext='See your bank details'/>
      </div>
      <section className='flex w-full flex-col gap-6'>
        {/* Pass 'incomes' as the type */}
        <DataTable type="incomes" />
      </section>
    </div>
  )
}

export default TransactionHistory;
