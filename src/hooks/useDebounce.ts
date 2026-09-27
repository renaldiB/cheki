import { useState, useEffect } from 'react';

/**
 * Reusable React hook to debounce any rapidly changing value (e.g. search queries, slider ticks).
 *
 * @param value The value to debounce
 * @param delay Milliseconds to delay updating the debounced value (default: 200ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
