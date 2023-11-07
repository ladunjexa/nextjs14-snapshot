'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';

import {bottombarLinks} from '@/constants';

import type {INavLink} from '@/types';

const Bottombar = () => {
  const pathname = usePathname();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex-center flex-col gap-1 p-2 transition ${
              isActive && 'rounded-[10px] bg-primary-500'
            }`}
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && 'invert-white'}`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
