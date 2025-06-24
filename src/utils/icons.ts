/**
 * Tries to resolve the best available icon from <link rel="..."> tags.
 * Falls back to the provided URL if no preferred icon is found.
 *
 * Priority:
 * 1. SVG icon (scalable)
 * 2. Apple touch icon
 * 3. Other favicons (PNG, ICO...)
 * 4. Fallback URL
 */

// Define a utility function to retrieve the best icon URL from <link> tags, with a fallback
export function getBestIconUrl(fallbackUrl: string): string {
    // Get all <link> elements that have a 'rel' attribute and cast them as HTMLLinkElement[]
    const links = Array.from(document.querySelectorAll('link[rel]')) as HTMLLinkElement[];

    // 1. Try to find a link tag for an SVG icon
    const svgIcon = links.find(link =>
        link.rel.includes('icon') && link.type === 'image/svg+xml' && link.href
    );
    // If found, return its href
    if (svgIcon) return svgIcon.href;

    // 2. Try to find an Apple touch icon
    const appleIcon = links.find(link =>
        link.rel === 'apple-touch-icon' && link.href
    );
    // If found, return its href
    if (appleIcon) return appleIcon.href;

    // 3. Try to find any other favicon (e.g., PNG, ICO)
    const otherIcon = links.find(link =>
        link.rel.includes('icon') && link.href
    );
    // If found, return its href
    if (otherIcon) return otherIcon.href;

    // 4. If no icon is found, return the provided fallback URL
    return fallbackUrl;
}