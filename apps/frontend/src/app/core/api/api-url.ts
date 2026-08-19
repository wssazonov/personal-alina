declare global {
    interface Window {
        __ALINA_CONFIG__?: {
            apiUrl?: string;
        };
    }
}

const PRODUCTION_API_URL = 'https://personal-alina-production.up.railway.app/api';
const configuredApiUrl = window.__ALINA_CONFIG__?.apiUrl?.replace(/\/+$/, '');
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const shouldUseProductionApi =
    !isLocalHost && (!configuredApiUrl || configuredApiUrl === '/api');

export const API_URL = shouldUseProductionApi
    ? PRODUCTION_API_URL
    : (configuredApiUrl ?? '/api');
