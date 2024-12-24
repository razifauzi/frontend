import HeaderBox from '@/components/HeaderBox'
import Report from '@/components/Reports'
import React from 'react'

const Reports = () => {
  return (
    <div className='transactions'>
      <div className="transactions-header">
        <HeaderBox title='Income & Expenses Charts' subtext='See your bank details'/>
      </div>
      <section className='flex w-full flex-col gap-6'>
        <Report/>
        <Report/>
        
      </section>
    </div>
  )
}

export default Reports
