import {z} from 'zod';

export const profileSchema = z.object({
  name: z.string().nonempty('Name is required'),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number') // Basic phone number validation
    .nonempty('Phone number is required'),
  location: z.string().nonempty('Location is required'),
  bio: z.string().nonempty('Please tell about yourself'),
});

// TypeScript: Infer the type from the schema
export type ProfileFormData = z.infer<typeof profileSchema>;
