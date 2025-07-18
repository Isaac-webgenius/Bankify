import React from 'react';
import Header from '@/components/Header';
import TotalBalance from '@/components/TotalBalance';
import RightSidebar from '@/components/RightSidebar';

const Dashboard = () => {
  const loggedIn = { firstName: "Nathan", lastName: "Stark", email: 'contact@Nate.dev'}

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

        RECENT TRANSACTIONS
      </div>

      <RightSidebar 
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 153.46 }, { currentBalance: 234.78 }]}
      />
    </section>
  )
}

export default Dashboard;