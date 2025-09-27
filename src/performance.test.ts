import { describe, it, expect } from 'vitest';
import { measure } from './performance';

describe('measure', () => {
  it('should return success status and correct value for a simple function', () => {
    const fn = () => 42;
    const result = measure(fn);

    expect(result.status).toBe('success');
    expect(result.data.value).toBe(42);
    expect(typeof result.data.duration).toBe('number');
    expect(result.data.duration).toBeGreaterThanOrEqual(0);
  });

  it('should handle functions that throw errors', () => {
    const errorFn = () => {
      throw new Error('Test error');
    };

    const result = measure(errorFn);

    expect(result.status).toBe('error');
    expect(result.message).toBe('Test error');
    expect(result.data.value).toBeNull();
    expect(typeof result.data.duration).toBe('number');
  });

  it('should handle functions that throw non-Error values', () => {
    const errorFn = () => {
      throw 'string error';
    };

    const result = measure(errorFn);

    expect(result.status).toBe('error');
    expect(result.message).toBe('An error occurred during function execution');
    expect(result.data.value).toBeNull();
  });

  it('should measure duration for async functions (even if not awaited)', async () => {
    const fn = async () => {
      let sum = 0;

      for (let i = 0; i < 1e5; i++) {
        sum += i;
      }

      return sum;
    };

    const result = await measure(fn);

    expect(result.status).toBe('success');
    expect(result.data.value).toBeGreaterThan(0);
    expect(result.data.duration).toBeGreaterThanOrEqual(0);
  });

  it('should work with functions returning undefined', () => {
    const fn = () => undefined;

    const result = measure(fn);

    expect(result.status).toBe('success');
    expect(result.data.value).toBeUndefined();
  });

  it('should measure duration accurately', async () => {
    const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    const result = await measure(async () => sleep(10));

    expect(result.data.duration).toBeGreaterThanOrEqual(10);
  });

  it('should handle functions that return a resolved Promise', async () => {
    const promiseFn = () => Promise.resolve('resolved');
    const result = await measure(promiseFn);

    expect(result.status).toBe('success');
    expect(result.data.value).toBe('resolved');
    expect(result.data.duration).toBeGreaterThanOrEqual(0);
  });

  it('should handle functions that return a rejected Promise', async () => {
    const promiseFn = () => Promise.reject(new Error('Promise rejected'));
    const result = await measure(promiseFn);

    expect(result.status).toBe('error');
    expect(result.data.value).toBeNull();
    expect(result.message).toBe('Promise rejected');
    expect(result.data.duration).toBeGreaterThanOrEqual(0);
  });

  it('should handle async functions that throw synchronously', async () => {
    const asyncThrow = async () => {
      throw new Error('Async error');
    };

    const result = await measure(asyncThrow);

    expect(result.status).toBe('error');
    expect(result.data.value).toBeNull();
  });

  it('should measure duration for a function that returns a Promise after a delay', async () => {
    const delayedPromise = () => new Promise<number>((resolve) => setTimeout(() => resolve(123), 20));
    const result = await measure(delayedPromise);

    expect(result.status).toBe('success');
    expect(result.data.value).toBe(123);
    expect(result.data.duration).toBeGreaterThanOrEqual(20);
  });
});
