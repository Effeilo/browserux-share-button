/**
 * <browserux-share-button> Web Component
 * ------------------------------------------------------
 * A smart, customizable share button using the Web Share API
 * with a rich fallback for unsupported environments.
 *
 * Features:
 * - Uses the native Web Share API when available (ideal for mobile/PWA)
 * - Falls back to a customizable modal menu if not supported
 * - Supports: Email, X (Twitter), Facebook, WhatsApp, SMS, LinkedIn, Telegram, Reddit
 * - Each platform can be disabled via an attribute: e.g. <browserux-share-button facebook="false">
 * - Automatically detects share metadata from the manifest or HTML attributes
 * - Fully localized (based on the `lang` attribute or <html lang>)
 * - Renders in Shadow DOM by default, or Light DOM if `no-shadow` is present
 * - Slot support for custom icon in the main button
 * - Mobile fallback slides in from bottom; dismissible via backdrop click or swipe down
 * - Accessible: keyboard, ARIA roles, custom copy label and icon support
 *
 * Example usage:
 * <browserux-share-button lang="en" url="https://..." text="Check this out!" whatsapp="false"></browserux-share-button>
 */

/**
 * Importing global type definitions for platform control and localization
 * These types are shared across the component logic and fallback rendering
 */

import type { SharePlatform, LangKeys } from '../types/';

/**
 * Utility function to resolve the best available icon URL for the app
 * Used when rendering the fallback copy-to-clipboard preview
 * Prioritizes high-quality icons (e.g. Apple Touch, favicon) from the document
 */

import { getBestIconUrl } from '../utils/icons';

/**
 * Retrieves platform-specific share icons (e.g. Facebook, WhatsApp)
 * Used to visually represent each share option in the fallback modal
 */

import { getShareIcon } from '../utils/share-icons'

// -----------------------------------------------------------------------
// Templates & CSS
// -----------------------------------------------------------------------

/**
 * Static HTML template for <browserux-share-button>
 *
 * Includes:
 * - The main share button (with optional slot for a custom icon)
 * - Default scoped styles using CSS variables
 * - Compatible with Shadow DOM or Light DOM
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host,
  :root {
    --bux-share-btn-bg: #eaeaea;
    --bux-share-btn-color: #121212;
    --bux-share-btn-font-size: 2rem;
    --bux-share-btn-height: 4.2rem;
    --bux-share-btn-padding-inline: 1.5rem;
    --bux-share-btn-border-radius: 0.5rem;
    --bux-share-btn-gap: 0.5rem;
    --bux-share-btn-hover-bg: #121212;
    --bux-share-btn-hover-color: #eaeaea;
  }

  #bux-share-btn {
    align-items: center;
    appearance: none; 
    font-family: inherit;
    background: var(--bux-share-btn-bg);
    border: none; 
    border-radius: var(--bux-share-btn-border-radius);
    color: var(--bux-share-btn-color);
    cursor: pointer;
    display: inline-flex;
    font-size: var(--bux-share-btn-font-size);
    font-weight: bold;
    gap: var(--bux-share-btn-gap);
    height: var(--bux-share-btn-height);
    justify-content: center;
    line-height: 1;
    padding-inline: var(--bux-share-btn-padding-inline);
    user-select: none; 
    vertical-align: middle;
  }

  #bux-share-btn:hover {
    background: var(--bux-share-btn-hover-bg);
    color: var(--bux-share-btn-hover-color);
  }

  ::slotted(*) {
    line-height: 1;
    vertical-align: middle;
  }

  ::slotted(svg),
  ::slotted(img),
  ::slotted(span) {
    display: block;
  }
</style>

<!-- Main share button, with optional slot for icon and dynamic label -->
<button id="bux-share-btn">
  <slot name="icon">🔗</slot>
  <span id="label-placeholder">Share</span>
</button>
`;

/**
 * CSS styles for the fallback modal
 *
 * Handles:
 * - Modal layout and animations (opacity + slide-up on mobile)
 * - The share options list (with responsive styling)
 * - Copy-to-clipboard section with app icon preview
 * - Theme customization via CSS variables
 */

const fallbackStyle = `
:root {
  --bux-share-fallback-bg: #251f17;
  --bux-share-fallback-color: #ede0d4;
  --bux-share-fallback-border-radius: 2rem;
  --bux-share-fallback-title-font-size: 2.2rem;
  --bux-share-fallback-copy-box-bg: #302921;
}

#bux-share-fallback-menu {
  /* Ne pas forcer display ni largeur ici */
  text-align: left;
  background: transparent;
}

.bux-share-fallback {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;      
  justify-content: center;   
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3); /* Optionnel : léger fond pour modale */
}

.bux-share-fallback.visible {
  opacity: 1;
  pointer-events: auto;
}
.bux-share-fallback-inner {
  background: var(--bux-share-fallback-bg);
  border-radius: var(--bux-share-fallback-border-radius);
  color: var(--bux-share-fallback-color);
  max-width: 320px;
  width: auto;
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

@media (max-width: 768px) {
  #bux-share-fallback-menu {
    width: 100%;
  }
  .bux-share-fallback {
    align-items: end;  
  }
  .bux-share-fallback-inner {
    width: 100%;
    max-width: 100%;
    border-radius: var(--bux-share-fallback-border-radius) var(--bux-share-fallback-border-radius) 0 0;
    transform: translateY(100%);
  }
  .bux-share-fallback.visible .bux-share-fallback-inner {
    transform: translateY(0); /* 👈 remonte */
  }
}

#bux-share-fallback-title {
  color: inherit;
  font-size: var(--bux-share-fallback-title-font-size);
  font-weight: normal;
  margin: 0;
}

#bux-share-fallback-menu a,
#bux-share-fallback-menu button {
  appearance: none; 
  background: none;
  border: none; 
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  text-decoration: none;
}

#bux-copy-box {
  background: var(--bux-share-fallback-copy-box-bg);
  padding: 10px;
  border-radius: var(--bux-share-fallback-border-radius);
  margin: 20px 0;
}

#bux-copy-wrapper {
  align-items: center;
  display: flex;
  gap: 10px;
  overflow: hidden;
  width: 100%;
}

#bux-copy-logo {
  flex: 0 0 auto;
  width: 48px;
}

#bux-copy-text {
  flex: 1 1 auto;
  overflow: hidden;
  min-width: 0;
}

#bux-copy-text strong {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#bux-copy-icon {
  flex: 0 0 auto;
  font-size: 2.5rem;
}

#bux-share-fallback-menu ul {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}

#bux-share-fallback-menu ul li {
  font-size: 14px;
  margin: 5px 0;
  min-width: 70px;
  text-align: center;
  width: 70px;
}

#bux-share-fallback-menu ul a img {
  border-radius: 50%;
  width: 50px;
}

#bux-share-fallback-menu ul a span {
  display: block;
  text-align: center;
}
`;

/**
 * HTML structure for the fallback share menu.
 *
 * Contains:
 * - A fullscreen modal with a semi-transparent backdrop
 * - A share panel with:
 *    - Localized heading
 *    - A copy link button with app icon preview
 *    - Platform-specific share links (conditionally rendered)
 * - Mobile behavior: slides in from the bottom with touch support
 */

const fallbackTemplate = document.createElement('template');
fallbackTemplate.innerHTML = `

<div class="bux-share-fallback">
  <div id="bux-share-fallback-menu">
    <div class="bux-share-fallback-inner" role="dialog" aria-labelledby="bux-share-fallback-title" tabindex="0">
      <h2 id="bux-share-fallback-title"></h2>
      <div id="bux-copy-box">
        <button style="width: 100%;" id="bux-copy-link"></button>
      </div>
      <ul id="bux-platforms-list"></ul>
    </div>
  </div>
</div>
`;

// -----------------------------------------------------------------------
// Texts
// -----------------------------------------------------------------------

/**
 * Internationalized ARIA labels for accessibility
 *
 * Each language entry provides the default text for:
 * - `share`: the label on the main button
 * - `email`: the label for the email fallback link
 * - `sms`: Label for the SMS fallback link (mobile only)
 * - `copied`: the confirmation message after copying
 * - `errorInit`: message when initialization fails
 * - `errorShare`: message when Web Share API fails
 * - `errorCopy`: message when copy fails
 *
 * These strings are selected based on the `lang` attribute
 * of the component or <html>, with fallback to English
 */

const I18N_LABELS: Record<string, {
  share: string;
  email: string;
  sms: string;
  copied: string;
  errorInit: string;
  errorShare: string;
  errorCopy: string;
}> = {
  en: { share: 'Share', email: 'Email', sms: 'Messages', copied: 'Link copied!', errorInit: 'Error initializing share button:', errorShare: 'Error during native sharing:', errorCopy: 'Error copying link:' },
  fr: { share: 'Partager', email: 'Email', sms: 'Messages', copied: 'Lien copié !', errorInit: 'Erreur d\'initialisation du bouton de partage :', errorShare: 'Erreur lors du partage natif :', errorCopy: 'Erreur lors de la copie du lien :' },
  es: { share: 'Compartir', email: 'Correo', sms: 'Mensajes', copied: '¡Enlace copiado!', errorInit: 'Error al inicializar el botón de compartir:', errorShare: 'Error al compartir de forma nativa:', errorCopy: 'Error al copiar el enlace:' },
  de: { share: 'Teilen', email: 'E-Mail', sms: 'Nachrichten', copied: 'Link kopiert!', errorInit: 'Fehler beim Initialisieren des Teilen-Buttons:', errorShare: 'Fehler beim nativen Teilen:', errorCopy: 'Fehler beim Kopieren des Links:' },
  ja: { share: '共有する', email: 'メール', sms: 'メッセージ', copied: 'リンクがコピーされました！', errorInit: '共有ボタンの初期化中にエラーが発生しました：', errorShare: 'ネイティブ共有中にエラーが発生しました：', errorCopy: 'リンクのコピー中にエラーが発生しました：' },
  ru: { share: 'Поделиться', email: 'Эл. почта', sms: 'Сообщения', copied: 'Ссылка скопирована!', errorInit: 'Ошибка инициализации кнопки общего доступа:', errorShare: 'Ошибка при нативном общем доступе:', errorCopy: 'Ошибка копирования ссылки:' },
  pt: { share: 'Compartilhar', email: 'Email', sms: 'Mensagens', copied: 'Link copiado!', errorInit: 'Erro ao inicializar o botão de compartilhamento:', errorShare: 'Erro ao compartilhar nativamente:', errorCopy: 'Erro ao copiar o link:' },
  it: { share: 'Condividi', email: 'Email', sms: 'Messaggi', copied: 'Link copiato!', errorInit: 'Errore durante l\'inizializzazione del pulsante di condivisione:', errorShare: 'Errore durante la condivisione nativa:', errorCopy: 'Errore durante la copia del link:' },
  nl: { share: 'Delen', email: 'E-mail', sms: 'Berichten', copied: 'Link gekopieerd!', errorInit: 'Fout bij het initialiseren van de deelknop:', errorShare: 'Fout bij native delen:', errorCopy: 'Fout bij het kopiëren van de link:' }
};

/**
 * Core class logic for the <browserux-share-button> custom element
 *
 * Handles the component's lifecycle, localization, DOM rendering,
 * and runtime behavior (including native share integration and fallback)
 *
 * Responsibilities include:
 * - Resolving language and metadata from attributes, document, or manifest
 * - Dynamically rendering either the Shadow DOM or Light DOM
 * - Building the native share experience with graceful fallback
 * - Responding to user interactions and platform-specific behaviors
 * 
 * @property shareTitle - Title used for sharing
 * @property shareText - Optional text for sharing description
 * @property shareUrl - URL to be shared
 */

class ShareButton extends HTMLElement {

  /**
   * Component constructor
   */

  constructor() {
    super();
  }

  // -----------------------------------------------------------------------
  // Private properties
  // -----------------------------------------------------------------------

  // The share title shown in native share dialog or fallback email
  private shareTitle!: string;

  // Optional share message (description) used with native or fallback
  private shareText!: string;

  // The URL to be shared. Defaults to `location.href`
  private shareUrl!: string;

  // Root node for rendering.
  // Points to either the Shadow DOM or the element itself if `no-shadow` is set
  private root!: ShadowRoot | HTMLElement;

  // Object of translated labels selected from I18N_LABELS
  private labels!: typeof I18N_LABELS[string];

  // Reference to the fallback modal element appended to <body>
  // Created and cached after the first call to `renderExternalFallback()`
  // Used to control visibility, interaction, and lifecycle of the fallback UI
  private externalFallbackEl?: HTMLDivElement;

  // -----------------------------------------------------------------------
  // Configuration & Utilities 
  // -----------------------------------------------------------------------

  /**
   * Checks whether a given sharing platform is disabled via HTML attribute
   * Platforms are disabled by setting their attribute to "false", e.g.:
   *   <browserux-share-button facebook="false">
   */

  private isDisabled(platform: SharePlatform): boolean {
    return this.getAttribute(platform) === 'false';
  }

  /**
   * Returns a full sharing configuration for a given platform.
   * 
   * Each configuration includes:
   * - The share link (URL with prefilled params)
   * - A localized or platform-specific label
   * - An icon URL used in the fallback UI
   * 
   * If the platform is unknown or unsupported, returns null.
   */

  private getShareConfig(platform: SharePlatform): { href: string; label: string; icon: string } | null {
    // Destructure necessary metadata and labels from the component context
    const { shareTitle, shareText, shareUrl, labels } = this;

    // Determine the platform and build its corresponding share config
    switch (platform) {
      case 'email':
        // Email: mailto link with subject and body
        return {
          href: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n' + shareUrl)}`,
          label: labels.email,
          icon: getShareIcon('email'),
        };
      case 'sms':
        // SMS: sms link with message body (mobile only)
        return {
          href: `sms:?body=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
          label: labels.sms,
          icon: getShareIcon('sms'),
        };
      case 'x':
        // X (Twitter): pre-filled tweet with text and URL
        return {
          href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
          label: 'X',
          icon: getShareIcon('x'),
        };
      case 'facebook':
        // Facebook: share dialog with URL
        return {
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          label: 'Facebook',
          icon: getShareIcon('facebook'),
        };
      case 'whatsapp':
        // WhatsApp: share message with text and URL
        return {
          href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' - ' + shareUrl)}`,
          label: 'WhatsApp',
          icon: getShareIcon('whatsapp'),
        };
      case 'linkedin':
        // LinkedIn: share dialog with URL
        return {
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          label: 'LinkedIn',
          icon: getShareIcon('linkedin'),
        };
      case 'telegram':
        // Telegram: share message with URL and text
        return {
          href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          label: 'Telegram',
          icon: getShareIcon('telegram'),
        };
      case 'reddit':
        // Reddit: post submission with URL and title
        return {
          href: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
          label: 'Reddit',
          icon: getShareIcon('reddit'),
        };
      default:
        // Unknown or unsupported platform
        return null;
    }
  }

  // -----------------------------------------------------------------------
  // Localization & Initialization
  // -----------------------------------------------------------------------

  /**
   * Stores the cleanup function for removing the focus trap listener.
   * 
   * Assigned dynamically when the fallback modal is shown,
   * and called when the modal is dismissed (e.g. via Escape key or backdrop click).
   */

  private focusTrapRemover?: () => void;
  
  /**
   * Handles the Escape key press to close the fallback modal if it's open.
   * 
   * - Removes the `.visible` class from the modal container
   * - Removes the associated focus trap listener (if any)
   */

  private onKeyDown = (e: KeyboardEvent): void => {
    // If Escape is pressed and the fallback modal is currently visible
    if (e.key === 'Escape' && this.externalFallbackEl?.classList.contains('visible')) {
      // Hide the modal by removing the visibility class
      this.externalFallbackEl.classList.remove('visible');

      // If a focus trap remover is set, call it to remove the focus trap listener
      if (this.focusTrapRemover) this.focusTrapRemover();
    }
  };

  // -----------------------------------------------------------------------
  // Main button rendering
  // -----------------------------------------------------------------------

  /**
   * Renders the main share button inside the component (Shadow DOM or light DOM)
   *
   * Responsibilities:
   * - Injects the static HTML/CSS template into the root
   * - Updates the button label based on the current language
   * - Binds a click event to the button:
   *     → Uses the native Web Share API if available
   *     → Otherwise falls back to the custom fallback modal
   *
   * This method is typically called once during `connectedCallback()`,
   * after localization and metadata have been resolved
   */

  private render(): void {
    // Clear any existing content inside the rendering root
    this.root.innerHTML = '';

    // Clone and append the static template (HTML + styles)
    this.root.appendChild(template.content.cloneNode(true));

    // Shortcut to the localized labels (based on current lang)
    const l = this.labels;

    // Locate the label placeholder inside the button
    const label = this.root.querySelector('#label-placeholder') as HTMLSpanElement;

    // Set the button label to the localized "Share" string
    if (label) label.textContent = l.share;

    // Locate the <button> element inside the rendered template
    const btn = this.root.querySelector('#bux-share-btn') as HTMLButtonElement;

    // Register a click event handler for the button
    btn.addEventListener('click', async () => {
      // Prepare the share payload based on resolved metadata
      const data = {
        title: this.shareTitle,
        text: this.shareText,
        url: this.shareUrl,
      };

      // Check if the Web Share API is available in the browser
      if ('share' in navigator) {
        // If supported, and canShare is available, validate the data
        if (navigator.canShare && !navigator.canShare(data)) {
          // If the data is not shareable, fall back to custom UI
          this.showFallback();
          return;
        }

        try {
          // Try sharing using the native Web Share API
          await navigator.share(data);
        } catch (err: any) {
          // If the user cancels the share, silently ignore the error
          if (err.name === 'AbortError' || err.message?.includes('cancel')) {
            return;
          }

          // On any other error, fallback to custom share options
          console.error(this.labels.errorShare, err);
          this.showFallback();
        }
      } else {
        // If Web Share API is not supported, fallback to custom UI
        this.showFallback();
      }
    });
  }

  // -----------------------------------------------------------------------
  // Fallback rendering (modal)
  // -----------------------------------------------------------------------

  /**
   * Renders the fallback modal for environments where the Web Share API is unsupported or fails.
   * 
   * - Clones and appends the fallback modal HTML to the document body
   * - Injects fallback-specific styles (only once)
   * - Sets the localized heading
   * - Adds share links for enabled platforms
   * - Initializes the copy-to-clipboard button with icon and URL
   */
  
  private renderExternalFallback(): void {
    // If the fallback has already been rendered, skip
    if (this.externalFallbackEl) return;

    // Clone the fallback modal from the template
    const fallbackClone = fallbackTemplate.content.firstElementChild?.cloneNode(true) as HTMLDivElement;
    if (!fallbackClone) return;

    // Set the localized title inside the fallback modal
    const heading = fallbackClone.querySelector('#bux-share-fallback-title');
    if (heading) heading.textContent = this.labels.share;

    // Inject the fallback CSS styles into the <head> if not already present
    if (!document.head.querySelector('[data-bux-fallback-style]')) {
      const style = document.createElement('style');
      style.textContent = fallbackStyle;
      style.setAttribute('data-bux-fallback-style', 'true');
      document.head.appendChild(style);
    }

    // Append the fallback modal to the <body>
    document.body.appendChild(fallbackClone);
    this.externalFallbackEl = fallbackClone;

    // Bind click and touch events to allow closing the fallback modal
    this.bindFallbackEvents(fallbackClone);

    // Render platform-specific share links inside the modal
    this.renderPlatformLinks(fallbackClone);

    // Get the default share icon for the copy-to-clipboard section
    const fallbackImg = getShareIcon('website');

    // Determine the best available icon URL from the document (e.g., favicon or apple-touch-icon),
    // falling back to `fallbackImg` if no better icon is found
    const iconUrl = getBestIconUrl(fallbackImg);
    
    // Construct the initial HTML markup for the "Copy Link" button,
    // including icon, title, and URL for display in the fallback menu
    const initialCopyHtml = `
      <span id="bux-copy-wrapper">
        <span id="bux-copy-logo">
          <img src="${iconUrl}" alt="App icon" width="48" height="48">
        </span>
        <span id="bux-copy-text">
          <strong>${this.shareTitle}</strong>
          ${this.shareUrl}
        </span>
        <span id="bux-copy-icon">
          🔗
        </span>
      </span>
    `;

    // Render the copy button with its initial content
    this.renderCopyButton(fallbackClone, initialCopyHtml);
  }

  /**
   * Populates the fallback modal with enabled platform-specific share links.
   * 
   * - Loops through supported platforms
   * - Skips disabled platforms or mobile-only ones (e.g. SMS on desktop)
   * - Appends a styled share link (icon + label) for each valid platform
   *
   * @param container - The fallback modal container where links will be injected
   */

  private renderPlatformLinks(container: HTMLElement): void {
    // Select the <ul> element where platform <li> items will be added
    const list = container.querySelector('#bux-platforms-list') as HTMLUListElement;

    // List of all supported platforms
    const platforms: SharePlatform[] = ['email', 'x', 'facebook', 'whatsapp', 'sms', 'linkedin', 'telegram', 'reddit'];

    // Detect whether the current device is a mobile (used for SMS)
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // Iterate over all platforms and render them if enabled
    platforms.forEach((platform) => {
      // Skip platform if it's explicitly disabled via attribute
      if (this.isDisabled(platform)) return;

      // Skip SMS link if not on a mobile device
      if (platform === 'sms' && !isMobile) return;

      // Create the list item and anchor
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.target = '_blank';

      // Get the share configuration (URL, label, icon) for the platform
      const config = this.getShareConfig(platform);
      if (!config) return;

      // Build the anchor's inner HTML with icon and label
      a.href = config.href;
      a.innerHTML = `<img src="${config.icon}" alt="${config.label}" width="48" height="48"><span>${config.label}</span>`;

      // Append the anchor to the list item, and the item to the list
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /**
   * Renders and wires up the "Copy Link" button in the fallback modal.
   * 
   * - Inserts the initial HTML content with app icon, title, and URL
   * - Handles click to copy the share URL to the clipboard
   * - Displays a temporary success message after copying
   *
   * @param container - The fallback modal container where the copy button is located
   * @param initialCopyHtml - The inner HTML to display inside the button initially
   */

  private renderCopyButton(container: HTMLElement, initialCopyHtml: string): void {
    // Select the copy button element inside the container
    const copyBtn = container.querySelector('#bux-copy-link') as HTMLButtonElement;

    // Shortcut to localized labels
    const l = this.labels;

    // Set the initial HTML (icon + title + URL)
    copyBtn.innerHTML = initialCopyHtml;

    // Register a click handler to copy the link to clipboard
    copyBtn.addEventListener('click', async () => {
      try {
        // Attempt to write the share URL to the clipboard
        await navigator.clipboard.writeText(this.shareUrl);

        // On success, temporarily show a localized "Link copied!" message
        copyBtn.textContent = l.copied;

        // Restore original HTML after 2 seconds
        setTimeout(() => (copyBtn.innerHTML = initialCopyHtml), 2000);
      } catch (err) {
        // Log error if clipboard copy fails
        console.error(l.errorCopy, err);
      }
    });
  }

  /**
   * Binds interaction events to the fallback modal:
   * 
   * - Closes the modal when the backdrop is clicked
   * - Enables swipe-down-to-close behavior on mobile
   * - Cleans up keyboard listeners and focus traps when dismissed
   *
   * @param container - The fallback modal container element
   */

  private bindFallbackEvents(container: HTMLElement): void {
    // Close modal when clicking outside the inner content (on backdrop)
    container.addEventListener('click', (e: MouseEvent) => {
      const inner = container.querySelector('.bux-share-fallback-inner');
      if (!inner) return;

      // If click is outside the modal content, close the modal
      if (!inner.contains(e.target as Node)) {
        container.classList.remove('visible');
        document.removeEventListener('keydown', this.onKeyDown);

        // Clean up the focus trap if active
        if (this.focusTrapRemover) this.focusTrapRemover();
      }
    });

    // Enable swipe-to-close on mobile devices only
    if (window.innerWidth <= 768) {
      let startY: number | null = null;
      const inner = container.querySelector('.bux-share-fallback-inner') as HTMLElement;
      if (!inner) return;

      // Store the starting Y position of the touch
      inner.addEventListener('touchstart', (e: TouchEvent) => {
        startY = e.touches[0].clientY;
      });

      // Calculate the vertical swipe distance
      inner.addEventListener('touchmove', (e: TouchEvent) => {
        if (startY === null) return;
        const currentY = e.touches[0].clientY;
        const diffY = currentY - startY;

        // If swiped down by more than 60px, close the modal
        if (diffY > 60) {
          container.classList.remove('visible');
          document.removeEventListener('keydown', this.onKeyDown);
          if (this.focusTrapRemover) this.focusTrapRemover();
          startY = null;
        }
      });

      // Reset swipe start on touch end
      inner.addEventListener('touchend', () => {
        startY = null;
      });
    }
  }

  /**
   * Displays the fallback modal when the Web Share API is unavailable or fails.
   * 
   * - Ensures the fallback DOM is rendered
   * - Makes the modal visible with animation
   * - Focuses the modal for accessibility
   * - Enables keyboard interaction (Escape to close, Tab to trap focus)
   */

  private showFallback(): void {
    // Ensure the fallback modal is rendered (runs only once)
    this.renderExternalFallback();

    // If fallback element failed to render, abort
    if (!this.externalFallbackEl) return;

    // Force a reflow by accessing `offsetHeight`
    // This ensures that the following CSS transition is properly triggered
    void this.externalFallbackEl.offsetHeight;

    // Use requestAnimationFrame to allow CSS transition to apply cleanly
    requestAnimationFrame(() => {
      setTimeout(() => {
        // Make the fallback modal visible (adds .visible class)
        this.externalFallbackEl!.classList.add('visible');

        // Focus the fallback modal container for accessibility
        const inner = this.externalFallbackEl!.querySelector('.bux-share-fallback-inner') as HTMLElement;
        if (inner && typeof inner.focus === 'function') {
          inner.focus();
        }

        // Collect all focusable elements inside the modal
        const focusable = inner.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        // Trap focus within the modal when Tab/Shift+Tab is pressed
        const trapFocus = (e: KeyboardEvent) => {
          if (e.key !== 'Tab' || focusable.length === 0) return;

          if (e.shiftKey) {
            // If Shift+Tab on first element, loop to last
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            // If Tab on last element, loop to first
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        };

        // Enable keyboard focus trapping inside the modal
        document.addEventListener('keydown', trapFocus);
        this.focusTrapRemover = () => document.removeEventListener('keydown', trapFocus);

        // Enable Escape key to close modal via onKeyDown handler
        document.addEventListener('keydown', this.onKeyDown);
      }, 20);
    });
  }

  // -----------------------------------------------------------------------
  // Lifecycle
  // -----------------------------------------------------------------------

  /**
   * Lifecycle method: called automatically when the component is connected to the DOM
   *
   * Responsibilities:
   * - Determines the rendering context (Shadow DOM or Light DOM)
   * - Resolves the current language and loads localization labels
   * - Fetches metadata from the web app manifest (if needed)
   * - Initializes the share title, text, and URL
   * - Calls `render()` to display the share button
   *
   * All metadata can be overridden via HTML attributes:
   *   - title="..." → Share title
   *   - text="..." → Share message
   *   - url="..." → Shared URL
   */

  async connectedCallback() {
    // If the element has the 'no-shadow' attribute, render in light DOM
    // Otherwise, attach Shadow DOM for encapsulated styling
    this.root = this.hasAttribute('no-shadow')
      ? this
      : this.attachShadow({ mode: 'open' });

    // Get the language from the component attribute or the <html lang>, fallback to 'en'
    const langAttr = this.getAttribute('lang') || document.documentElement.lang || 'en';

    // Use the language if it's defined in I18N_LABELS, else fallback to English
    const lang = (I18N_LABELS[langAttr as LangKeys]) ? langAttr as LangKeys : 'en';

     // Load the corresponding localized label set for this language
    this.labels = I18N_LABELS[lang];

    // Prepare to fetch manifest metadata if needed
    let manifest: { name?: string; description?: string } = {};
    const hasTitleAttr = this.hasAttribute('title');
    const hasTextAttr = this.hasAttribute('text');

    // If title or text is not provided via attributes, attempt to fetch from manifest
    if (!hasTitleAttr || !hasTextAttr) {
      try {
        // Use custom manifest path if specified, else try to find <link rel="manifest">
        const manifestSrc = this.getAttribute('manifest-src');
        const manifestEl = document.querySelector('link[rel="manifest"]') as HTMLLinkElement | null;
        const manifestHref = manifestSrc || manifestEl?.href;

        // Fetch and parse the manifest JSON
        if (manifestHref) {
          const res = await fetch(manifestHref);
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          manifest = await res.json();
        }
      } catch (err) {
         // Log initialization errors (e.g. failed fetch
        console.warn(this.labels.errorInit, err);
      }
    }

    // Set share title from attribute, <title> or manifest name
    this.shareTitle = this.getAttribute('title') || (document.title?.trim() || null) || manifest.name || 'Untitled';

    // Set share description from attribute, meta description or manifest
    const metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    this.shareText = this.getAttribute('text') || metaDescription?.content?.trim() || manifest.description || '';

    // Set URL to share from attribute or current page
    this.shareUrl = this.getAttribute('url') || location.href;

    // Proceed to render the component with the resolved values
    this.render(); 

    // Apply inline custom properties defined via `style="--var: value"` (Shadow DOM-safe)
    this.applyInlineCSSVars();
  }

  /**
   * Applies inline CSS custom properties defined via the `style` attribute
   * (e.g. `<browserux-share-button style="--bux-share-btn-bg: red">`)
   * to the correct rendering context (Shadow DOM or Light DOM).
   *
   * Why this is necessary:
   * - CSS custom properties set on the `style` attribute are **not scoped** into Shadow DOM
   *   due to encapsulation.
   * - This method manually reads all `--*` custom properties from `this.style`
   *   and re-applies them to the host using `style.setProperty(...)`.
   *
   * Automatically called after the component is mounted via `connectedCallback()`.
   */

  private applyInlineCSSVars() {
    const isShadowRoot = (node: ShadowRoot | HTMLElement): node is ShadowRoot =>
      node instanceof ShadowRoot;

    const targetEl = isShadowRoot(this.root) ? this.root.host : this.root;

    if (targetEl instanceof HTMLElement) {
      for (let i = 0; i < this.style.length; i++) {
        const name = this.style.item(i);
        if (name.startsWith('--')) {
          const value = this.style.getPropertyValue(name);
          if (value) {
            targetEl.style.setProperty(name, value);
          }
        }
      }
    }
  }

}

/**
 * Registers the <browserux-share-button> as a custom element
 * Associates the HTML tag with the ShareButton class definition
 */

customElements.define('browserux-share-button', ShareButton);

/**
 * Exports the ShareButton class to allow external usage,
 * such as manual instantiation or framework integration
 */

export { ShareButton };