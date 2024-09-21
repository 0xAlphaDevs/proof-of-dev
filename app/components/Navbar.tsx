"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useAccount } from 'wagmi';
import Image from 'next/image';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

const Navbar: React.FC = () => {

  const router = useRouter();
  const { isDisconnected } = useAccount();

  useEffect(() => {
    if (isDisconnected) {
      router.push("/");
    }
  }, [isDisconnected]);

  return (
    <div className='flex items-center justify-between px-6 py-4'>
      <div className="flex items-center gap-16">
        <Link
          href="/app"
          className="flex items-center gap-4 font-bold"
          prefetch={false}
        >
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
          <span className="text-3xl">
            Proof of Dev
          </span>
        </Link>
      </div>
      <DynamicWidget />
    </div>
  )
}

export default Navbar