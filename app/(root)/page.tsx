import HeaderBox from '@/components/HeaderBox'
import TotalBalance from '@/components/TotalBalance'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {
  const loggedIn = await getLoggedInUser()
  return (
    <section className='home'>
        <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.name || 'Guest' }
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
