import Navbar from "@/app/components/Navbar";
import Sidebar from "../components/dashboard/Sidebar";

import { LayoutDashboardIcon, SearchIcon, AwardIcon } from "lucide-react";

const links = [
  {
    href: "/profile",
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

export default function Profile({ children }: { children: React.ReactNode }) {
  return (
    <section className="">
      <Navbar />
      <div className="px-12 py-4">
        <Sidebar links={links} />
        <div className="col-start-3 col-end-13 pr-10 pl-64 z-40">
          {" "}
          {children}
        </div>
      </div>
    </section>
  );
}
