import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions'
import TotalBalance from '@/components/TotalBalance'

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
            <TotalBalance
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={120.35}
            />
            <TotalBalance
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={120.35}
            />
          </header>
          <RecentTransactions/>
        </div>
    </section>

  )
}

export default Home
