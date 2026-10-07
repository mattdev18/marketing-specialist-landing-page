/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Cloudflare Turnstile global (loaded on demand by ContactForm). */
interface Window {
  turnstile?: {
    render: (
      el: HTMLElement,
      options: { sitekey: string; theme?: string; callback?: (token: string) => void }
    ) => string;
    reset: (widgetId?: string) => void;
    getResponse: (widgetId?: string) => string | undefined;
  };
}
