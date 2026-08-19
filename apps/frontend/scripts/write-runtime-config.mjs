import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const productionApiUrl = 'https://personal-alina-production.up.railway.app/api';
const defaultApiUrl = process.env.VERCEL ? productionApiUrl : '/api';
const apiUrl = (process.env.PUBLIC_API_URL ?? defaultApiUrl)
    .trim()
    .replace(/\/+$/, '');

if (!apiUrl.startsWith('/') && !/^https?:\/\//u.test(apiUrl)) {
    throw new Error('PUBLIC_API_URL must be an absolute URL or a root-relative path.');
}

const runtimeConfig = `window.__ALINA_CONFIG__ = Object.freeze({ apiUrl: ${JSON.stringify(apiUrl)} });\n`;

await writeFile(resolve(import.meta.dirname, '../public/runtime-config.js'), runtimeConfig);
