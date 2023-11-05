import {useQuery} from '@tanstack/react-query';

import {getPostById, getRecentPosts} from '@/appwrite/actions/post.action';

import QUERY_KEYS from '@/lib/react-query/QueryKeys';

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};
