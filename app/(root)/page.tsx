import HeaderBox from '@/components/HeaderBox'
import {DualLineChart}   from '@/components/charts/LineChart'
import MultipleStatCard from '@/components/statCard/StatCards'
import IncomePieChart from '@/components/charts/income/IncomePieChart'
import ExpensesPieChart from '@/components/charts/expenses/ExpensesPieChart'

import React from 'react'

const Home = async () => {

  return (
    <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={ 'Guest' }
              subtext="Access"
            />
            {/* <TotalBalance/> */}
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <MultipleStatCard/>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <IncomePieChart/>
            <ExpensesPieChart/>
          </div>
            <DualLineChart/>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
         
        </div>
    </section>

  )
}

export default Home
