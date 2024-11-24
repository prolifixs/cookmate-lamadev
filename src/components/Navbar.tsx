'use client'

import React from "react"
import Link from "next/link"
import Image from "next/image"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
    return (
      <div className='h-24 flex items-center justify-between'>
        {/*LEFT */}
        <div className='md:hidden lg:block w[20%]'>
            <Link href="/" className='text-2xl font-bold text-blue-600'>Dishypal</Link>
        </div>
        
        {/*CENTER */}
        <div className='hidden md:flex w[50%] text-sm items-center justify-between'>
          {/*LINKS */}
          <div className='flex gap-6 text-gray-600'>
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/images/home.png" alt="HomePage" width={16} height={16} className="w-4 h-4"/>
              <span className="text-sm">HomePage</span>
            </Link>
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/images/friends.png" alt="Friends" width={16} height={16} className="w-4 h-4"/>
              <span className="text-sm">Friends</span>
            </Link>
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/images/stories.png" alt="Trending" width={16} height={16} className="w-4 h-4"/>
              <span className="text-sm">Trending</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center p-2 bg-slate-100 rounded-xl ml-8">
            <input type="text" placeholder="Search..." className="bg-transparent outline-none"/>
            <Image src="/images/search.png" alt="Search" width={14} height={14} className="w-4 h-4"/>
          </div>
        </div>

        {/*RIGHT */}
        <div className='w-[30%] flex items-center gap-4 justify-end'>
          <div className="cursor-pointer">
            <Image src="/images/people.png" alt="" width={20} height={20}/>
          </div>
          <div className="cursor-pointer">
            <Image src="/images/Messages.png" alt="" width={20} height={20}/>
          </div>
          <div className="cursor-pointer">
            <Image src="/images/Notifications.png" alt="" width={20} height={20}/>
          </div>
          <MobileMenu/>
        </div>
      </div>
    )
}

export default Navbar