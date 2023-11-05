'use client';

import Image from 'next/image';
import Link from 'next/link';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
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
        description: "To use SnapShot, you'll need to create a new account. It's easy and free!",
        button: 'Sign Up',
        link: {
          text: 'Already have an account?',
          url: '/sign-in',
          linkText: 'Sign in',
        },
      };
};

const Auth = ({action}: Props) => {
  const {formSchema, defaultValues, title, description, button, link} = getActionData(action);

  const isSignUp: boolean = action === 'SignUp';

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            {button}
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
