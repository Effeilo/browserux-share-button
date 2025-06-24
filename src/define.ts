/**
 * Ensures the <browserux-share-button> Web Component is defined only once.
 *
 * - Prevents multiple registrations (especially in micro-frontend or SSR contexts)
 * - If not already defined, dynamically imports the component module
 *
 * Can be safely called multiple times in any app entry point or framework setup.
 */

export function defineBrowseruxComponents() {
  // Check if the <browserux-share-button> is already defined in the Custom Elements Registry
  if (!customElements.get('browserux-share-button')) {
    // Dynamically import and define the component (lazy-loaded)
    import('./components/browserux-share-button');
  }
}