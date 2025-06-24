/**
 * Maps each supported platform or use case to its corresponding icon URL.
 * 
 * These icons are used in the fallback UI to visually represent share options.
 * All assets are hosted on the browserux.com CDN.
 */

export const SHARE_ICONS: Record<string, string> = {
  x:        'https://browserux.com/commons/logos/x.png',
  facebook: 'https://browserux.com/commons/logos/facebook.png',
  whatsapp: 'https://browserux.com/commons/logos/whatsapp.png',
  email:    'https://browserux.com/commons/logos/mail.png',
  sms:      'https://browserux.com/commons/logos/sms.png',
  copy:     'https://browserux.com/commons/logos/copy.png',
  website:  'https://browserux.com/commons/logos/website.png',
  linkedin: 'https://browserux.com/commons/logos/linkedin.png',
  telegram: 'https://browserux.com/commons/logos/telegram.png',
  reddit:   'https://browserux.com/commons/logos/reddit.png',
};

/**
 * A union type representing all valid icon keys from the SHARE_ICONS map.
 * 
 * Used to ensure type-safe access to available share icons.
 */

export type ShareIconKey = keyof typeof SHARE_ICONS;

/**
 * Returns the icon URL for a given sharing platform or usage key.
 * 
 * @param platform - One of the predefined ShareIconKey values
 * @returns A valid icon URL string, or an empty string if not found
 */

export function getShareIcon(platform: ShareIconKey): string {
  return SHARE_ICONS[platform] || '';
}