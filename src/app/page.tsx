'use client'

import MainLayout from '@/components/Layout/MainLayout'
import KitchenPanel from '@/components/HomeComponents/Layout/KitchenPanel'
import RecentCooks from '@/components/Layout/Feed/RecentCooks'
//import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  return (
    <MainLayout>
      <KitchenPanel />
      <RecentCooks />
    </MainLayout>
  )
}