"use client"
import Link from "next/link"
import { useState } from "react"

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className='md:hidden'>
            <div className='flex flex-col gap-[4.5px] cursor-pointer' 
            onClick={() => setIsOpen(prev => !prev)}
            >
                <div className={`w-6 h-1 bg-blue-500 rounded-sm transition-all origin-[50%] ease-in-out duration-300 ${isOpen ? 'rotate-45 translate-y-[10px]' : ''}`}/>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm transition-all ease-in-out duration-300 ${isOpen ? 'opacity-0' : ''}`}/>
                <div className={`w-6 h-1 bg-blue-500 rounded-sm transition-all origin-[50%] ease-in-out duration-300 ${isOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}/>
            </div>
            {isOpen && (
                <div className='absolute left-0 top-24 w-full h-[calc(100vh-6rem)] bg-white flex flex-col items-center justify-center gap-8 text-2xl font-medium z-10'>
                    <Link href="/">Home</Link>
                    <Link href="/">Dishy Friends</Link>
                    <Link href="/">Trending</Link>
                    <Link href="/">Login</Link>
                </div> 
                )}
        </div>
    )
}

export default MobileMenu