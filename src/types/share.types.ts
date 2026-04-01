/**
 * Supported sharing platforms for the <browserux-share-button> component.
 * 
 * These platform keys are used to generate share URLs and icons in both
 * the native Web Share API and the fallback modal UI.
 */

export type SharePlatform = 
  | 'email'
  | 'x'
  | 'facebook'
  | 'whatsapp'
  | 'sms'
  | 'linkedin'
  | 'telegram'
  | 'reddit';


/**
 * Icon identifiers used for platform-specific rendering.
 *
 * Includes all platforms plus special cases:
 * - 'copy': used for the copy-to-clipboard fallback
 * - 'website': fallback icon for app/site representation
 */

export type ShareIconKey =
  | SharePlatform
  | 'copy'
  | 'website';


/**
 * Configuration for a custom share platform registered via `ShareButton.registerPlatform()`.
 *
 * Allows integrators to add share targets beyond the built-in platforms.
 *
 * @example
 * ShareButton.registerPlatform('mastodon', {
 *   label: 'Mastodon',
 *   icon: 'https://example.com/mastodon-icon.png',
 *   getHref: (title, text, url) => `https://mastodon.social/share?text=${encodeURIComponent(text + ' ' + url)}`,
 * });
 */

export interface CustomPlatformConfig {
  /** Display label shown below the icon in the fallback modal */
  label: string;
  /** URL of the platform icon (48×48 recommended) */
  icon: string;
  /** Returns the share URL for this platform given the current share data */
  getHref: (title: string, text: string, url: string) => string;
}


/**
 * Share data used by the component and exposed via the programmatic API.
 */

export interface ShareData {
  title: string;
  text: string;
  url: string;
}