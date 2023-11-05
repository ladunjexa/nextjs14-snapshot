'use client';

import React from 'react';
import {useGetUsers} from '@/lib/react-query/queries/user.query';
import UserCard from '../cards/UserCard';
import Loader from '../shared/atoms/Loader';
import Alert from '../shared/atoms/Alert';

import {ERROR_ALERT_PROPS} from '@/constants';

const AllUsers = () => {
  const {data: creators, isLoading: isUserLoading, isError: isCreatorsError} = useGetUsers(10);

  if (isCreatorsError) return <Alert {...ERROR_ALERT_PROPS} />;

  return (
    <>
      {isUserLoading && !creators ? (
        <Loader />
      ) : (
        <ul className="user-grid">
          {creators?.documents.map(creator => (
            <li key={creator.$id} className="w-full min-w-[200px] flex-1">
              <UserCard user={creator} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AllUsers;
