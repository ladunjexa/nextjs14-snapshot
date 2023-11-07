'use client';

import {usePathname} from 'next/navigation';

import UserCard from '@/components/cards/UserCard';
import Loader from '@/components/shared/atoms/Loader';
import Alert from '@/components/shared/atoms/Alert';

import {ERROR_ALERT_PROPS} from '@/constants';

import {useGetUsers} from '@/lib/react-query/queries/user.query';

const RightSidebar = () => {
  const pathname = usePathname();
  const {data: creators, isLoading: isUserLoading, isError: isCreatorsError} = useGetUsers(10);

  if (isCreatorsError) return <Alert {...ERROR_ALERT_PROPS} />;

  if (isUserLoading && !creators) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <section
      className={`custom-scrollbar sticky right-0 top-0 z-20 flex h-screen min-w-[350px] flex-col justify-start overflow-auto border-l border-l-dark-4 bg-dark-2 px-6 py-10 max-xl:hidden 2xl:min-w-[500px] ${
        pathname.startsWith('/posts/') && 'hidden'
      }`}
    >
      <h3 className="h3-bold">Top Creators</h3>

      <div className="mt-7 grid grid-cols-1 gap-7 2xl:grid-cols-2">
        {creators?.documents.map((creator: any) => <UserCard key={creator.$id} user={creator} />)}
      </div>
    </section>
  );
};

export default RightSidebar;
