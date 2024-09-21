import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
// import { UserDetails } from '@/app/components/dashboard/UserDetails'
import { LayoutDashboardIcon, SearchIcon, AwardIcon } from 'lucide-react'

const links = [
  {
    href: "/dashboard/profile",
    text: "Profile",
    image: <LayoutDashboardIcon className="h-6 w-6" />,
  },
  {
    href: "/search",
    text: "Search",
    image: <SearchIcon className="h-6 w-6" />,
  },
  {
    href: "/leaderboard",
    text: "Leaderboard",
    image: <AwardIcon className="h-6 w-6" />,
  },
];

// if the 0xwallet: true push to this page
const Dashboard = () => {
  return (
    <div>
      {/* <div >
        <UserDetails />
      </div> */}
      <div>
        <Sidebar links={links} />
      </div>
    </div>
  )
}

export default Dashboard