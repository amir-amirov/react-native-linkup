import {z} from 'zod';
import i18next from '../../locales/i18n';

export const LoginSchema = z.object({
  email: z
    .string()
    .email(i18next.t('validation.email_invalid'))
    .nonempty(i18next.t('validation.email_required')),
  password: z
    .string()
    .min(6, i18next.t('validation.password_min'))
    .nonempty(i18next.t('validation.password_required')),
});

// TypeScript: Infer the type from the schema
export type LoginFormData = z.infer<typeof LoginSchema>;
