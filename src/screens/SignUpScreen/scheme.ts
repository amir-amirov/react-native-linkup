import {z} from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().nonempty('Name is required'),
    email: z
      .string()
      .email('Please enter a valid email')
      .nonempty('Email is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Password is required'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .nonempty('Password is required'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// TypeScript: Infer the type from the schema
export type SignUpFormData = z.infer<typeof signUpSchema>;
