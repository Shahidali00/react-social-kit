export interface Translations {
  shareOn: string;
  shareVia: string;
  platformNames: Record<string, string>;
}

export const defaultTranslations: Record<string, Translations> = {
  en: {
    shareOn: 'Share on',
    shareVia: 'Share via',
    platformNames: {
      facebook: 'Facebook',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      pinterest: 'Pinterest',
      reddit: 'Reddit',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      email: 'Email'
    }
  },
  es: {
    shareOn: 'Compartir en',
    shareVia: 'Compartir vía',
    platformNames: {
      facebook: 'Facebook',
      twitter: 'Twitter',
      linkedin: 'LinkedIn',
      pinterest: 'Pinterest',
      reddit: 'Reddit',
      whatsapp: 'WhatsApp',
      telegram: 'Telegram',
      email: 'Correo'
    }
  },
  // Add more languages
};

export const getTranslation = (
  locale: string,
  key: keyof Translations,
  platform?: string
): string => {
  const translations = defaultTranslations[locale] || defaultTranslations.en;

  if (key === 'platformNames' && platform) {
    return translations.platformNames[platform] || platform;
  }

  // Handle platformNames case when no platform is provided
  if (key === 'platformNames') {
    return ''; // or throw an error, or return a default value
  }

  return translations[key] as string || defaultTranslations.en[key] as string;
};
