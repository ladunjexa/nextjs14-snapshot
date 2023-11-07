import React from 'react';

import Bottombar from '@/components/shared/layout/Bottombar';
import LeftSidebar from '@/components/shared/layout/LeftSidebar';
import RightSidebar from '@/components/shared/layout/RightSidebar';
import Topbar from '@/components/shared/layout/Topbar';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex h-full flex-1">{children}</section>

      <RightSidebar />
      <Bottombar />
    </main>
  );
}
