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