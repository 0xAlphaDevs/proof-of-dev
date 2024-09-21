import React from 'react'
import { UserDetails } from '@/app/components/dashboard/UserDetails'

// if the 0xwallet: true push to this page
const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <div className='px-[35%]'>
        <UserDetails />
      </div>


    </div>
  )
}

export default Dashboard