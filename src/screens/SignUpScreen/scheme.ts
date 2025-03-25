import {z} from 'zod';
import i18next from '../../locales/i18n';

export const signUpSchema = z
  .object({
    name: z.string().nonempty(i18next.t('validation.name_required')),
    email: z
      .string()
      .email(i18next.t('validation.email_invalid'))
      .nonempty(i18next.t('validation.email_required')),
    password: z
      .string()
      .min(6, i18next.t('validation.password_min'))
      .nonempty(i18next.t('validation.password_required')),
    confirmPassword: z
      .string()
      .min(6, i18next.t('validation.password_min'))
      .nonempty(i18next.t('validation.password_required')),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: i18next.t('validation.password_unmatch'),
    path: ['confirmPassword'],
  });

// TypeScript: Infer the type from the schema
export type SignUpFormData = z.infer<typeof signUpSchema>;
