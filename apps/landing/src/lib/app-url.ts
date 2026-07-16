// The product app lives on its own subdomain; the landing site only links out.
const APP_URL = import.meta.env.PUBLIC_APP_URL ?? "https://app.linguaa.app";

export const appUrl = (path: string): string => new URL(path, APP_URL).toString();
