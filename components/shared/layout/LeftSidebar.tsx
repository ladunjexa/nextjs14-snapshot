'use client';

import {useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';

import {useUserContext} from '@/context/AuthContext';

import {Button} from '@/components/ui/button';

import {useSignOutAccount} from '@/lib/react-query/mutations/user.mutation';

import {sidebarLinks} from '@/constants';

import type {INavLink} from '@/types';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const {user} = useUserContext();

  const {mutate: signOut, isSuccess} = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      router.push('/sign-in');
    }
  }, [isSuccess, router]);

  return (
    <nav className="leftsidebar custom-scrollbar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/images/logo.svg" alt="logo" width={201} height={42} />
        </Link>

        <Link href={`/profile/${user.id}`} className="flex items-center gap-3">
          <Image
            src={user.imageUrl || 'assets/icons/profile-placeholder.svg'}
            alt="profile"
            width={24}
            height={24}
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}
              >
                <Link href={link.route} className="flex items-center gap-4 p-4">
                  <Image
                    src={link.imgURL}
                    alt={link.label}
                    width={24}
                    height={24}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10 gap-3">
        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
          <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
