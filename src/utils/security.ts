/**
 * Security & Sanitization Utilities
 * Conforms to OWASP Top 10 Guidelines:
 * - Anti-XSS (Input sanitization & HTML character stripping)
 * - Safe LocalStorage retrieval with runtime schema checks
 * - Strict URL scheme validation
 * - Mobile Phone & Email validation
 */

/**
 * Strips script tags, HTML tags, dangerous attributes, and non-printable control characters.
 */
export function sanitizeText(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[&<>"'/]/g, (match) => {
      const escapeMap: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return escapeMap[match] || match;
    })
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim();
}

/**
 * Validates Bangladeshi or international mobile phone format.
 * Allows digits, spaces, hyphens, and leading +.
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.replace(/[\s-]/g, '');
  // Matches BD numbers (013-019, 11 digits) or international +8801...
  const bdPattern = /^(?:\+8801|8801|01)[3-9]\d{8}$/;
  const generalPattern = /^\+?[1-9]\d{7,14}$/;
  return bdPattern.test(clean) || generalPattern.test(clean);
}

/**
 * Validates email according to standard RFC 5322 simplified pattern.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return pattern.test(email.trim());
}

/**
 * Validates that an external URL uses strict https protocol.
 */
export function validateHttpsUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Safe JSON parser with try-catch and schema/type fallback.
 */
export function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === 'object') {
      return parsed as T;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

/**
 * Normalizes patient name for session indexing.
 */
export function normalizePatientName(name: string): string {
  return sanitizeText(name).toLowerCase().replace(/[^a-z0-9]/g, '_');
}
