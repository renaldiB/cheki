/**
 * High-performance sliding-window in-memory rate limiter for Cheki API
 * Protects against DDoS, automated scraping, credential attacks, and API bill exhaustion.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class MemoryRateLimiter {
  private store: Map<string, RateLimitRecord> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private lastCleanup: number = Date.now();

  constructor(maxRequests: number = 15, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  /**
   * Check if a given identifier (IP address) is within rate limits.
   */
  public check(identifier: string): {
    allowed: boolean;
    limit: number;
    remaining: number;
    retryAfter: number;
  } {
    const now = Date.now();
    this.cleanupIfNecessary(now);

    const record = this.store.get(identifier);

    if (!record || now > record.resetAt) {
      // First request or window expired: start new window
      this.store.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs,
      });

      return {
        allowed: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        retryAfter: 0,
      };
    }

    if (record.count >= this.maxRequests) {
      // Limit exceeded
      const retryAfter = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
      return {
        allowed: false,
        limit: this.maxRequests,
        remaining: 0,
        retryAfter,
      };
    }

    // Increment count
    record.count += 1;
    return {
      allowed: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - record.count,
      retryAfter: 0,
    };
  }

  /**
   * Remove expired IP records to prevent memory growth over time.
   */
  private cleanupIfNecessary(now: number) {
    if (now - this.lastCleanup > 300000) { // Every 5 minutes
      for (const [key, record] of this.store.entries()) {
        if (now > record.resetAt) {
          this.store.delete(key);
        }
      }
      this.lastCleanup = now;
    }
  }
}

// Global singleton rate limiter for the analyze API: 15 requests per 60 seconds
export const analyzeRateLimiter = new MemoryRateLimiter(15, 60000);

/**
 * Helper to safely extract client IP from incoming Next.js request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    // x-forwarded-for may contain comma-separated IPs: client, proxy1, proxy2
    const clientIp = forwarded.split(',')[0].trim();
    if (clientIp) return clientIp;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const netlifyClientIp = req.headers.get('client-ip');
  if (netlifyClientIp) return netlifyClientIp.trim();

  return '127.0.0.1';
}
