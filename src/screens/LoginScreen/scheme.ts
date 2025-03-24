import {z} from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
});

// TypeScript: Infer the type from the schema
export type LoginFormData = z.infer<typeof LoginSchema>;
