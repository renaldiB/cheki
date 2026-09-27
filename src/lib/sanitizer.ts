/**
 * Input sanitization, size validation, and prompt injection defense for Cheki
 */

const MAX_ITEMS = 30;
const MAX_ITEM_NAME_LEN = 150;
const MAX_LOCATION_LEN = 100;
const MAX_PAYLOAD_BYTES = 50 * 1024; // 50 KB

const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous|prior)\s+instructions/i,
  /reveal\s+(?:the\s+)?system\s+prompt/i,
  /output\s+(?:the\s+)?prompt\s+above/i,
  /you\s+are\s+now\s+(?:an?\s+)?unrestricted/i,
  /bypass\s+(?:all\s+)?safety/i,
  /dan\s+mode/i,
  /jailbreak/i,
];

/**
 * Remove harmful characters, script tags, and prompt injection tokens.
 */
export function sanitizeText(input: string, maxLen: number): string {
  if (typeof input !== 'string') return '';

  let cleaned = input
    // Remove null bytes and control chars (except standard whitespace)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Strip HTML tags like <script> or <iframe>
    .replace(/<[^>]*>?/gm, '')
    .trim();

  // Neutralize common prompt injection phrases
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    if (pattern.test(cleaned)) {
      cleaned = cleaned.replace(pattern, '[REDACTED_INJECTION]');
    }
  }

  return cleaned.slice(0, maxLen);
}

export function validatePayloadSize(contentLengthHeader: string | null): boolean {
  if (!contentLengthHeader) return true;
  const len = parseInt(contentLengthHeader, 10);
  return !isNaN(len) && len <= MAX_PAYLOAD_BYTES;
}

export { MAX_ITEMS, MAX_ITEM_NAME_LEN, MAX_LOCATION_LEN };
