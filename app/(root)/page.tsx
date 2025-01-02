import { Component } from '@/components/Component'
import HeaderBox from '@/components/HeaderBox'
import { StatCard } from '@/components/StatCard'
import { VisitorChart } from '@/components/VisitorChart'
import { Users, CreditCard, DollarSign, Activity } from 'lucide-react'

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
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <StatCard
              title="Total Customers"
              value="10,843"
              icon={Users}
              description="+2.5% from last month"
            />
            <StatCard
              title="Total Revenue"
              value="$45,231.89"
              icon={DollarSign}
              description="+20.1% from last month"
            />
            
            <StatCard
              title="Active Subscriptions"
              value="7,842"
              icon={CreditCard}
              description="+180 this week"
            /> 
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <Component/>
            <Component/>
          </div>
          
          <VisitorChart/>
          
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
         
        </div>
    </section>

  )
}

export default Home
