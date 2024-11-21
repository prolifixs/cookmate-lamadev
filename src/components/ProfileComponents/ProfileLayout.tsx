'use client'

import React from 'react';
import LeftMenu from '../Layout/LeftMenu';
import RightMenu from '../Layout/RightMenu';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 pt-4">
      <div className="flex justify-between max-w-[2000px] mx-auto">
        <div className="w-[300px] flex-shrink-0">
          <LeftMenu />
        </div>

        <div className="w-[800px] flex-shrink-0 flex flex-col gap-4 pb-4">
          {children}
        </div>

        <div className="w-[300px] flex-shrink-0">
          <RightMenu />
        </div>
      </div>
    </div>
  );
} 