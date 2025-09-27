import { Optional, Result } from './interfaces';

export type AnyFunction<TReturn = unknown> = (...args: unknown[]) => TReturn;

export type MeasuredFunctionResult<T> = Result & {
  data: {
    value: Optional<T>;
    duration: number;
  };
};

// Overload signatures
export function measure<T>(fn: () => T): MeasuredFunctionResult<T>;
export function measure<T>(fn: () => Promise<T>): Promise<MeasuredFunctionResult<T>>;

// Implementation
export function measure<T>(fn: () => T | Promise<T>): MeasuredFunctionResult<T> | Promise<MeasuredFunctionResult<T>> {
  const start = performance.now();

  const onError = (error: unknown, duration: number): MeasuredFunctionResult<T> => {
    let message: string;

    if (error instanceof Error && typeof error.message === 'string') {
      message = error.message;
    } else {
      message = 'An error occurred during function execution';
    }

    return {
      status: 'error',
      message,
      data: { value: null, duration },
    };
  };

  // ({
  //   status: 'error',
  //   message: error instanceof Error ? error.message : 'An error occurred during function execution',
  //   data: { value: null, duration },
  // });

  try {
    const value = fn();
    if (value instanceof Promise) {
      // Use async/await inside an IIFE to avoid then/catch
      return (async () => {
        try {
          const resolved = await value;
          return {
            status: 'success',
            message: 'Function executed successfully',
            data: { value: resolved, duration: performance.now() - start },
          };
        } catch (error: unknown) {
          return onError(error, performance.now() - start);
        }
      })();
    }

    return {
      status: 'success',
      message: 'Function executed successfully',
      data: { value, duration: performance.now() - start },
    };
  } catch (error) {
    return onError(error, performance.now() - start);
  }
}
