import React from 'react';
import Header from '@/components/Header';
import TotalBalance from '@/components/TotalBalance';
import RightSidebar from '@/components/RightSidebar';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Dashboard = async () => {
  const loggedIn = await getLoggedInUser();

  
  return (
    <section className='home'>
      <div className="home-content">
        <Header
          className="home-header" 
          type="greeting"
          title="Welcome"
          user={loggedIn?.name || 'Guest'}
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