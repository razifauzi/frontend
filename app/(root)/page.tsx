import HeaderBox from '@/components/HeaderBox'
import TotalBalance from '@/components/TotalBalance'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: 'Adrian'}
  return (
    <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || 'Guest' }
              subtext="Access"
            />
            <TotalBalance
              accounts={[]}
              totalBanks={1}
              totalCurrentBalance={120.35}
            />
          </header>
        </div>
    </section>

  )
}

export default Home
