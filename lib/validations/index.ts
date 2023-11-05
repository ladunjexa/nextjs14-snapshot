import * as z from 'zod';

export const SignUpValidation = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters long'}),
  username: z.string().min(2, {message: 'Username must be at least 2 characters long'}),
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, {message: 'Name must be at least 2 characters long'}),
  username: z.string().min(2, {message: 'Username must be at least 2 characters long'}),
  email: z.string().email(),
  bio: z.string(),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, {
      message: 'Caption must be at least 5 characters.',
    })
    .max(2000, {message: 'Caption must be less than 2000 characters.'}),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, {message: 'Location must be at least 2 character.'})
    .max(1000, {message: 'Location must be less than 1000 characters.'}),
  tags: z.string(),
});
