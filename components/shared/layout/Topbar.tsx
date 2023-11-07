'use client';

import {useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {useUserContext} from '@/context/AuthContext';

import {Button} from '@/components/ui/button';

import {useSignOutAccount} from '@/lib/react-query/mutations/user.mutation';

const Topbar = () => {
  const router = useRouter();

  const {user} = useUserContext();

  const {mutate: signOut, isSuccess} = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  return (
    <section className="topbar">
      <div className="flex-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/images/logo.svg" alt="logo" width={162} height={325} />
        </Link>

        <div className="flex gap-4">
          <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} />
          </Button>

          <Link href={`/profile/${user.id}`} className="flex-center gap-3">
            <Image
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
              width={24}
              height={24}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
