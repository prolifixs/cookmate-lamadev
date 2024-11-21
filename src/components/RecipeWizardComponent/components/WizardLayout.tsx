'use client'

import RightMenu from '@/components/Layout/RightMenu'

interface WizardLayoutProps {
  children: React.ReactNode
}

export default function WizardLayout({ children }: WizardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 pt-4">
      <div className="flex justify-between max-w-[2000px] mx-auto">
        {/* Main Content - wider now that left panel is removed */}
        <div className="w-[1100px] flex-shrink-0 flex flex-col gap-4 pb-4">
          {children}
        </div>

        {/* Right Panel */}
        <div className="w-[300px] flex-shrink-0">
          <RightMenu />
        </div>
      </div>
    </div>
  )
} 