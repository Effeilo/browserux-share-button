/**
 * Main public entry point for the BrowserUX Share Button package.
 * 
 * Re-exports:
 * - Web Component class and registration function
 * - Public type definitions (platforms, languages, icons)
 * - Optional utility functions for icon handling
 * 
 * Example usage:
 *   import { ShareButton, defineBrowseruxComponents, getShareIcon } from 'browserux-share-button';
 */

// Component class and custom element registration
export * from './components/browserux-share-button';
export * from './define';

// Public types (e.g. SharePlatform, LangKeys)
export * from './types';

// Optional utility functions for external usage
export { getShareIcon } from './utils/share-icons';
export { getBestIconUrl } from './utils/icons';