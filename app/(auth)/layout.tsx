import React from 'react';
import Image from 'next/image';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Auth — SnapShot',
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center py-10">{children}</div>

      <Image
        src="./assets/images/side-img.svg"
        alt="logo"
        className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
        width={500}
        height={500}
      />
    </>
  );
}
