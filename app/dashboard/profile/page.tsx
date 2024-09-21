import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from '@/app/components/ui/button'


const Profile = () => {
  return (
    <div className='flex flex-col gap-4 px-[20%]'>
      <div className='flex gap-4 items-center'>
        <Avatar className='w-[100px] h-[100px]'>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-16 items-center'>
            <p className='font-bold text-xl'>
              Shadcn
            </p>
            <p className=' font-semibold'>
              POD Score :  <span className='text-white bg-green-600 rounded-full font-normal text-sm px-2 py-0.5'>100</span>
            </p>
          </div>

          <p className='font-semibold text-gray-500'>Pro Front-end Developer | Building Shadcn | @Vercel </p>
        </div>

      </div>
      <div className='flex gap-4 items-center'>
        <a href="https://github.com/0xyshv" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <a href="https://x.com/0xyshv" target="_blank" rel="noopener noreferrer">
          X / Twitter
        </a>
        <a href="https://farcaster.xyz/0xyshv" target="_blank" rel="noopener noreferrer">
          Farcaster
        </a>
      </div>

      <div className='flex gap-4 items-center'>
        <Button variant="outline">Endorse</Button>
        <Button variant="outline">Sponser</Button>
      </div>
      <div className='flex gap-4 items-center'>
        Endorsements Received
      </div>
    </div>
  )
}

export default Profile