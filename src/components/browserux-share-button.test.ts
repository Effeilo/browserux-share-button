/**
 * Tests for <browserux-share-button>
 *
 * Coverage:
 * - Language detection & fallback
 * - Share data resolution (defaults, attributes)
 * - Programmatic API: share(), setShareData(), openFallback(), closeFallback()
 * - Custom platform registry: registerPlatform()
 * - Platform disabling via attributes
 * - Custom events: bux:share-success, bux:share-abort, bux:share-error,
 *                  bux:fallback-open, bux:fallback-close,
 *                  bux:copy-success, bux:copy-error
 * - Focus restoration when modal closes
 * - Mobile detection: SMS visibility
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ShareButton } from './browserux-share-button';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Wait for real timers: covers rAF + the inner setTimeout(20) in showFallback(). */
const flush = (ms = 80): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/** Creates, connects and waits for the component's async connectedCallback. */
async function createElement(
  attrs: Record<string, string> = {},
): Promise<ShareButton & HTMLElement> {
  const el = document.createElement('browserux-share-button') as ShareButton & HTMLElement;
  for (const [key, val] of Object.entries(attrs)) {
    el.setAttribute(key, val);
  }
  document.body.appendChild(el);
  // Wait for connectedCallback (async manifest fetch) to finish
  await flush(50);
  return el;
}

/** Captures the next occurrence of an event as a Promise. */
function captureEvent<T = unknown>(
  el: EventTarget,
  name: string,
): Promise<CustomEvent<T>> {
  return new Promise(resolve =>
    el.addEventListener(name, e => resolve(e as CustomEvent<T>), { once: true }),
  );
}

// ---------------------------------------------------------------------------
// Global mocks
// ---------------------------------------------------------------------------

beforeEach(() => {
  // Redirect rAF to a real setTimeout(0) so showFallback()'s animation chain works
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    return window.setTimeout(() => cb(performance.now()), 0);
  });

  // Suppress console noise from expected error paths
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});

  // fetch: always fail so manifest fetch is a no-op
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

  // matchMedia — default: desktop (no coarse pointer = no touch)
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));

  // navigator.share — default: native share succeeds
  Object.defineProperty(navigator, 'share', {
    value: vi.fn().mockResolvedValue(undefined),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(navigator, 'canShare', {
    value: vi.fn().mockReturnValue(true),
    writable: true,
    configurable: true,
  });
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.innerHTML = '';
  document.documentElement.removeAttribute('lang');
  // Reset the custom platform registry between tests
  (ShareButton as any).customPlatforms.clear();
});

// ---------------------------------------------------------------------------
// Registration
// ---------------------------------------------------------------------------

describe('Custom element registration', () => {
  it('is registered in the custom element registry', () => {
    expect(customElements.get('browserux-share-button')).toBe(ShareButton);
  });
});

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------

describe('Language detection', () => {
  it('uses the lang attribute when provided', async () => {
    const el = await createElement({ lang: 'fr', title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('Partager');
  });

  it('falls back to English for an unknown lang code', async () => {
    const el = await createElement({ lang: 'xx', title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('Share');
  });

  it('renders Chinese labels when lang="zh"', async () => {
    const el = await createElement({ lang: 'zh', title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('分享');
  });

  it('renders Korean labels when lang="ko"', async () => {
    const el = await createElement({ lang: 'ko', title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('공유');
  });

  it('renders Arabic labels when lang="ar"', async () => {
    const el = await createElement({ lang: 'ar', title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('مشاركة');
  });

  it('uses <html lang> when no lang attribute is set on the element', async () => {
    document.documentElement.setAttribute('lang', 'de');
    const el = await createElement({ title: 'Test', url: 'https://example.com' });
    const label = el.shadowRoot?.querySelector('#label-placeholder');
    expect(label?.textContent?.trim()).toBe('Teilen');
  });
});

// ---------------------------------------------------------------------------
// Share data resolution
// ---------------------------------------------------------------------------

describe('Share data resolution', () => {
  it('reads url from the attribute and shows it in the fallback', async () => {
    const el = await createElement({ title: 'T', url: 'https://custom.example.com', text: 'desc' });
    el.openFallback();
    await flush(100);
    const box = document.body.querySelector('#bux-copy-text');
    expect(box?.textContent).toContain('https://custom.example.com');
  });

  it('reads title from the attribute and shows it in the fallback', async () => {
    const el = await createElement({ title: 'My Custom Title', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const strong = document.body.querySelector('#bux-copy-text strong');
    expect(strong?.textContent).toBe('My Custom Title');
  });

  it('falls back to document.title when no title attribute is given', async () => {
    document.title = 'Page Title From Document';
    const el = await createElement({ url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const strong = document.body.querySelector('#bux-copy-text strong');
    expect(strong?.textContent).toBe('Page Title From Document');
  });
});

// ---------------------------------------------------------------------------
// setShareData()
// ---------------------------------------------------------------------------

describe('setShareData()', () => {
  it('updates the shared URL shown in the fallback', async () => {
    const el = await createElement({ title: 'T', url: 'https://old.example.com' });
    el.setShareData({ url: 'https://new.example.com' });
    el.openFallback();
    await flush(100);
    const box = document.body.querySelector('#bux-copy-text');
    expect(box?.textContent).toContain('https://new.example.com');
  });

  it('updates the title without affecting other fields', async () => {
    const el = await createElement({ title: 'Old', url: 'https://example.com' });
    el.setShareData({ title: 'New Title' });
    el.openFallback();
    await flush(100);
    const strong = document.body.querySelector('#bux-copy-text strong');
    const box = document.body.querySelector('#bux-copy-text');
    expect(strong?.textContent).toBe('New Title');
    expect(box?.textContent).toContain('https://example.com');
  });
});

// ---------------------------------------------------------------------------
// Platform disabling
// ---------------------------------------------------------------------------

describe('Platform disabling', () => {
  it('does not render a platform that is set to "false"', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com', facebook: 'false' });
    el.openFallback();
    await flush(100);
    const links = document.body.querySelectorAll<HTMLAnchorElement>('#bux-platforms-list a');
    const hrefs = Array.from(links).map(a => a.href);
    expect(hrefs.every(h => !h.includes('facebook'))).toBe(true);
  });

  it('renders a platform that is not disabled', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const links = document.body.querySelectorAll<HTMLAnchorElement>('#bux-platforms-list a');
    const hrefs = Array.from(links).map(a => a.href);
    expect(hrefs.some(h => h.includes('facebook'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Mobile detection — SMS
// ---------------------------------------------------------------------------

describe('Mobile detection (SMS)', () => {
  it('hides SMS on non-touch devices', async () => {
    // matchMedia default mock returns matches: false → desktop
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const links = document.body.querySelectorAll<HTMLAnchorElement>('#bux-platforms-list a');
    const hrefs = Array.from(links).map(a => a.href);
    expect(hrefs.every(h => !h.startsWith('sms:'))).toBe(true);
  });

  it('shows SMS on touch devices', async () => {
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query === '(pointer: coarse)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const links = document.body.querySelectorAll<HTMLAnchorElement>('#bux-platforms-list a');
    const hrefs = Array.from(links).map(a => a.href);
    expect(hrefs.some(h => h.startsWith('sms:'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Custom platform registry
// ---------------------------------------------------------------------------

describe('registerPlatform()', () => {
  it('renders a custom platform in the fallback modal', async () => {
    ShareButton.registerPlatform('mastodon', {
      label: 'Mastodon',
      icon: 'https://example.com/mastodon.png',
      getHref: (_t, _tx, url) =>
        `https://mastodon.social/share?text=${encodeURIComponent(url)}`,
    });
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const spans = Array.from(document.body.querySelectorAll('#bux-platforms-list span'));
    expect(spans.some(s => s.textContent === 'Mastodon')).toBe(true);
  });

  it('passes the correct href to the custom platform', async () => {
    ShareButton.registerPlatform('mastodon', {
      label: 'Mastodon',
      icon: 'https://example.com/mastodon.png',
      getHref: (_t, _tx, url) =>
        `https://mastodon.social/share?text=${encodeURIComponent(url)}`,
    });
    const el = await createElement({ title: 'T', url: 'https://example.com/page' });
    el.openFallback();
    await flush(100);
    const links = document.body.querySelectorAll<HTMLAnchorElement>('#bux-platforms-list a');
    const hrefs = Array.from(links).map(a => a.href);
    expect(hrefs.some(h => h.includes('mastodon.social'))).toBe(true);
  });

  it('respects the disable attribute for custom platforms', async () => {
    ShareButton.registerPlatform('mastodon', {
      label: 'Mastodon',
      icon: 'https://example.com/mastodon.png',
      getHref: (_t, _tx, url) =>
        `https://mastodon.social/share?text=${encodeURIComponent(url)}`,
    });
    const el = await createElement({
      title: 'T',
      url: 'https://example.com',
      mastodon: 'false',
    });
    el.openFallback();
    await flush(100);
    const spans = Array.from(document.body.querySelectorAll('#bux-platforms-list span'));
    expect(spans.every(s => s.textContent !== 'Mastodon')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Events — native share
// ---------------------------------------------------------------------------

describe('Events: native share', () => {
  it('dispatches bux:share-success with share data after a successful native share', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    const eventPromise = captureEvent<{ title: string; url: string }>(el, 'bux:share-success');
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('#bux-share-btn');
    btn?.click();
    const event = await eventPromise;
    expect(event.detail.url).toBe('https://example.com');
    expect(event.detail.title).toBe('T');
  });

  it('dispatches bux:share-abort when the user cancels native share', async () => {
    const abortError = Object.assign(new Error('Aborted'), { name: 'AbortError' });
    Object.defineProperty(navigator, 'share', {
      value: vi.fn().mockRejectedValue(abortError),
      configurable: true,
    });
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    const abortPromise = captureEvent(el, 'bux:share-abort');
    el.shadowRoot?.querySelector<HTMLButtonElement>('#bux-share-btn')?.click();
    await abortPromise;
    // Reaching here confirms the event fired
    expect(true).toBe(true);
  });

  it('dispatches bux:share-error on unexpected native share failure', async () => {
    const networkError = new Error('Network failure');
    Object.defineProperty(navigator, 'share', {
      value: vi.fn().mockRejectedValue(networkError),
      configurable: true,
    });
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    const errorPromise = captureEvent<{ error: unknown }>(el, 'bux:share-error');
    el.shadowRoot?.querySelector<HTMLButtonElement>('#bux-share-btn')?.click();
    const event = await errorPromise;
    expect(event.detail.error).toBe(networkError);
  });
});

// ---------------------------------------------------------------------------
// Events — fallback modal
// ---------------------------------------------------------------------------

describe('Events: fallback modal', () => {
  it('dispatches bux:fallback-open when the modal is opened', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    const openPromise = captureEvent(el, 'bux:fallback-open');
    el.openFallback();
    await openPromise;
    expect(true).toBe(true);
  });

  it('dispatches bux:fallback-close when the modal is closed', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const closePromise = captureEvent(el, 'bux:fallback-close');
    el.closeFallback();
    await closePromise;
    expect(true).toBe(true);
  });

  it('adds .visible to the fallback container when opened', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const overlay = document.body.querySelector('.bux-share-fallback');
    expect(overlay?.classList.contains('visible')).toBe(true);
  });

  it('removes .visible from the fallback container when closed', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    el.closeFallback();
    const overlay = document.body.querySelector('.bux-share-fallback');
    expect(overlay?.classList.contains('visible')).toBe(false);
  });

  it('closes the modal when pressing Escape', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    const overlay = document.body.querySelector('.bux-share-fallback');
    expect(overlay?.classList.contains('visible')).toBe(false);
  });

  it('closes the modal when clicking the backdrop', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    // Click on the overlay (backdrop), not on the inner panel
    const overlay = document.body.querySelector<HTMLElement>('.bux-share-fallback');
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(overlay?.classList.contains('visible')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Events — clipboard copy
// ---------------------------------------------------------------------------

describe('Events: clipboard copy', () => {
  it('dispatches bux:copy-success with the copied url', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com/page' });
    el.openFallback();
    await flush(100);
    const eventPromise = captureEvent<{ url: string }>(el, 'bux:copy-success');
    document.body.querySelector<HTMLButtonElement>('#bux-copy-link')?.click();
    const event = await eventPromise;
    expect(event.detail.url).toBe('https://example.com/page');
  });

  it('dispatches bux:copy-error when clipboard write fails', async () => {
    const clipError = new Error('Clipboard denied');
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(clipError) },
      configurable: true,
    });
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const errorPromise = captureEvent<{ error: unknown }>(el, 'bux:copy-error');
    document.body.querySelector<HTMLButtonElement>('#bux-copy-link')?.click();
    const event = await errorPromise;
    expect(event.detail.error).toBe(clipError);
  });

  it('shows "copied" feedback text after successful copy', async () => {
    const el = await createElement({ lang: 'en', title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    const copyBtn = document.body.querySelector<HTMLButtonElement>('#bux-copy-link')!;
    const donePromise = captureEvent(el, 'bux:copy-success');
    copyBtn.click();
    await donePromise;
    expect(copyBtn.textContent?.trim()).toBe('Link copied!');
  });
});

// ---------------------------------------------------------------------------
// Focus restoration
// ---------------------------------------------------------------------------

describe('Focus restoration', () => {
  it('returns focus to the share button when closeFallback() is called', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    // openFallback() stores the internal button as lastFocus
    el.openFallback();
    await flush(100);
    el.closeFallback();
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('#bux-share-btn');
    // In Shadow DOM, document.activeElement is the host; activeElement inside is on shadowRoot
    expect(el.shadowRoot?.activeElement).toBe(btn);
  });

  it('returns focus to the share button when Escape is pressed', async () => {
    const el = await createElement({ title: 'T', url: 'https://example.com' });
    el.openFallback();
    await flush(100);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    const btn = el.shadowRoot?.querySelector<HTMLButtonElement>('#bux-share-btn');
    expect(el.shadowRoot?.activeElement).toBe(btn);
  });
});
