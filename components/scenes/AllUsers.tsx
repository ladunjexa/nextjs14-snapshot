'use client';

import React from 'react';
import {useGetUsers} from '@/lib/react-query/queries/user.query';
import UserCard from '../cards/UserCard';

const AllUsers = () => {
  const {data: creators, isLoading: isUserLoading, isError: isCreatorsError} = useGetUsers(10);

  if (isCreatorsError) return <p>Error...</p>;

  return (
    <>
      {isUserLoading && !creators ? (
        <p>Loading...</p>
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
