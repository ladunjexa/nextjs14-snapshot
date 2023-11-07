'use client';

import {useRouter} from 'next/navigation';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';

import {useUserContext} from '@/context/AuthContext';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/components/ui/use-toast';
import FileUploader from '@/components/shared/FileUploader';
import Loader from '@/components/shared/atoms/Loader';

import {useGetUserById} from '@/lib/react-query/queries/user.query';
import {useUpdateUserAccount} from '@/lib/react-query/mutations/user.mutation';
import {ProfileValidation} from '@/lib/validations';

type Props = {
  userId: string;
};

const Profile = ({userId}: Props) => {
  const router = useRouter();
  const {toast} = useToast();

  const {user, setUser} = useUserContext();

  const {data: currentUser} = useGetUserById(userId || '');

  const {mutateAsync: updateUser, isPending: isUpdatePending} = useUpdateUserAccount();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || '',
    },
  });

  async function onSubmit(values: z.infer<typeof ProfileValidation>) {
    if (currentUser && currentUser.$id) {
      const updatedUser = await updateUser({
        userId: currentUser.$id,
        name: values.name,
        username: values.username,
        email: values.email,
        bio: values.bio,
        file: values.file,
      });

      if (!updatedUser) {
        return toast({
          title: "Couldn't update profile",
          description: 'Something went wrong while updating your profile. Please try again.',
        });
      } else {
        setUser({
          ...user,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          bio: updatedUser.bio,
          imageUrl: updatedUser.imageUrl,
        });

        router.push(`/profile/${userId}`);
      }
    }
  }

  if (!currentUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 flex w-full max-w-5xl flex-col gap-7"
      >
        <FormField
          control={form.control}
          name="file"
          render={({field}) => (
            <FormItem className="flex">
              <FormControl>
                <FileUploader
                  type="User"
                  fieldChange={field.onChange}
                  mediaUrl={currentUser.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-4">
          <Button type="button" className="shad-button_dark_4" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isUpdatePending}
          >
            {isUpdatePending ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              'Update Profile'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Profile;
