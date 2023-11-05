import Topbar from '@/components/shared/layout/Topbar';
import React from 'react';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="w-full md:flex">
      <Topbar />
      {/* <LeftSidebar /> */}

      <section className="flex h-full flex-1">{children}</section>

      {/* <RightSidebar /> */}
      {/* <Bottombar /> */}
    </main>
  );
}
