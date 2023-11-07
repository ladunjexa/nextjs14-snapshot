'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {useUserContext} from '@/context/AuthContext';

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import Loader from '@/components/shared/atoms/Loader';

import {useCreateUserAccount, useSignInAccount} from '@/lib/react-query/mutations/user.mutation';
import {SignInValidation, SignUpValidation} from '@/lib/validations';

type Props = {
  action: 'SignIn' | 'SignUp';
};

const getActionData = (action: string) => {
  return action === 'SignIn'
    ? {
        formSchema: SignInValidation,
        defaultValues: {
          email: '',
          password: '',
        },
        title: 'Sign in to your account',
        description: "Welcome back! We're so excited to see you again!",
        button: 'Sign In',
        link: {
          text: "Don't have an account?",
          url: '/sign-up',
          linkText: 'Sign up',
        },
      }
    : {
        formSchema: SignUpValidation,
        defaultValues: {
          name: '',
          username: '',
          email: '',
          password: '',
        },
        title: 'Create a new account',
        description: "Let's get you all set up! Enter your details below.",
        button: 'Sign Up',
        link: {
          text: 'Already have an account?',
          url: '/sign-in',
          linkText: 'Sign in',
        },
      };
};

const Auth = ({action}: Props) => {
  const router = useRouter();
  const {toast} = useToast();

  const {formSchema, defaultValues, title, description, button, link} = getActionData(action);

  const isSignUp: boolean = action === 'SignUp';

  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isSigningIn} = useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (isSignUp) {
        const newUser = await createUserAccount({
          // @ts-ignore
          name: values.name,
          email: values.email,
          // @ts-ignore
          username: values.username,
          password: values.password,
        });

        if (!newUser) {
          return toast({
            title: "Couldn't create account",
            description: 'Something went wrong. Please try again.',
          });
        }
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({
          title: "Couldn't sign in",
          description: 'Wrong email or password. Please try again.',
        });
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        router.push('/');
      } else {
        return toast({
          title: "Couldn't sign in",
          description: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="flex-center flex-col sm:w-420">
        <Image src="/assets/images/logo.svg" alt="logo" width={273} height={57} />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">{title}</h2>
        <p className="small-medium md:base-regular mt-2 text-center text-light-3">{description}</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex w-full flex-col gap-5">
          {isSignUp && (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" className="shad-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading || isCreatingAccount || isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              button
            )}
          </Button>

          <p className="small-regular mt-2 text-center text-light-2">
            {link.text}
            <Link href={link.url} className="small-semibold ml-1 text-primary-500">
              {link.linkText}
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Auth;
