import {z} from 'zod';
import i18next from '../../locales/i18n';

export const profileSchema = z.object({
  name: z.string().nonempty(i18next.t('validation.name_required')),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, i18next.t('validation.phone_invalid')) // Basic phone number validation
    .nonempty(i18next.t('phone_required')),
  location: z.string().nonempty(i18next.t('validation.location_required')),
  bio: z.string().nonempty(i18next.t('validation.bio_required')),
});

// TypeScript: Infer the type from the schema
export type ProfileFormData = z.infer<typeof profileSchema>;
