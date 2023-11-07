'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  createUserAccount,
  signInAccount,
  signOutAccount,
  updateUserAccount,
  updateUserFollowers,
  updateUserFollowing,
} from '@/appwrite/actions/user.action';

import QUERY_KEYS from '@/lib/react-query/QueryKeys';

import type {INewUser, IUpdateUser} from '@/types';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: {email: string; password: string}) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUserAccount(user),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};

export const useUpdateUserFollowers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({userId, followers}: {userId: string; followers: string[]}) =>
      updateUserFollowers(userId, followers),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
  });
};

export const useUpdateUserFollowing = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({userId, following}: {userId: string; following: string[]}) =>
      updateUserFollowing(userId, following),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USERS],
      });
    },
  });
};
