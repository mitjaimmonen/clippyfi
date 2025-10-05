import { Request } from 'express';

const supportedLangs = ['en', 'fi'];
const defaultLang = 'en';

export function getLang(req: Request): string {

  const langOverride = req.query.lang as string | undefined;
  if (langOverride) {
    const code = langOverride.trim().toLowerCase();
    if (supportedLangs.includes(code)) return code;
    const base = code.split('-')[0];
    if (supportedLangs.includes(base)) return base;
  }
  
  const accept = req.headers['accept-language'];
  if (!accept) return defaultLang;
  for (const lang of accept.split(',')) {
    const code = lang.split(';')[0].trim().toLowerCase();
    if (supportedLangs.includes(code)) return code;
    const base = code.split('-')[0];
    if (supportedLangs.includes(base)) return base;
  }
  return defaultLang;
}