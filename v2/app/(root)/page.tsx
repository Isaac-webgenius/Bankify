import React from 'react';
import Header from '@/components/Header';
import TotalBalance from '@/components/TotalBalance';

const Dashboard = () => {
  const loggedIn = { firstName: "Nathan"}

  return (
    <section className='home'>
      <div className="home-content">
        <Header
          className="home-header" 
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transaction efficiently."
        />

        <TotalBalance
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1650.35}
        />
      </div>
    </section>
  )
}

export default Dashboard;