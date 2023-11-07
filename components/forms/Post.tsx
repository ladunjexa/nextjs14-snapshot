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

import {useCreatePost, useUpdatePost} from '@/lib/react-query/mutations/post.mutation';
import {useGetPostById} from '@/lib/react-query/queries/post.query';
import {PostValidation} from '@/lib/validations';

type Props = {
  action: 'Create' | 'Update';
  postId?: string;
};

const Post = ({action, postId}: Props) => {
  const {toast} = useToast();
  const router = useRouter();

  const {user} = useUserContext();
  const {mutateAsync: createPost, isPending: isCreatingPost} = useCreatePost();
  const {mutateAsync: updatePost, isPending: isUpdatingPost} = useUpdatePost();
  const {data: post, isPending: isPostPending} = useGetPostById((postId as string) || '');

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'Update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        return toast({
          title: "Couldn't update post",
          description: 'Something went wrong while updating your post.',
        });
      }

      return router.push(`/posts/${post?.$id}`);
    }

    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: "Couldn't create post",
        description: 'Something went wrong while creating your post.',
      });
    }

    router.push('/');
  }

  if (action === 'Update' && isPostPending) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-5xl flex-col gap-9">
        <FormField
          control={form.control}
          name="caption"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  type="Post"
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl || ''}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({field}) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma &quot; , &quot;)
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Art, Expression, Learn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button type="button" className="shad-button_dark_4">
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isCreatingPost || isUpdatingPost}
          >
            {isCreatingPost || isUpdatingPost ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              `${action} Post`
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Post;
