declare global {
    interface Window {
        __ALINA_CONFIG__?: {
            apiUrl?: string;
        };
    }
}

export const API_URL = window.__ALINA_CONFIG__?.apiUrl?.replace(/\/+$/, '') || '/api';
