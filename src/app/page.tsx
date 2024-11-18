'use client'

import MainLayout from '@/components/Layout/MainLayout'
import KitchenPanel from '@/components/HomeComponents/Layout/KitchenPanel'
import RecentCooks from '@/components/Layout/Feed/RecentCooks'

export default function Home() {
  return (
    <MainLayout>
      <KitchenPanel />
      <RecentCooks />
    </MainLayout>
  )
}