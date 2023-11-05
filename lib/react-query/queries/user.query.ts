import {useQuery} from '@tanstack/react-query';

import {getCurrentUser} from '@/appwrite/actions/user.action';

import QUERY_KEYS from '@/lib/react-query/QueryKeys';

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};
