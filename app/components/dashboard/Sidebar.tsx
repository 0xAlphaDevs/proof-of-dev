"use client";

import React from "react";
import { NavbarProps } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC<NavbarProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <div className="grid fixed top-20 left-4 min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 text-lg py-2 my-2 transition-all hover:bg-slate-200 ${
                    pathname === link.href ? "bg-slate-300" : ""
                  }`}
                  prefetch={false}
                >
                  {link.image}
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
