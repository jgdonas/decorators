import { Optional, Result } from './interfaces';

export type AnyFunction<TReturn = unknown> = (...args: unknown[]) => TReturn;

export type MeasuredFunctionResult<T> = Result & {
  data: {
    value: Optional<T>;
    duration: number;
  };
};

const measure = <T extends AnyFunction>(fn: T): MeasuredFunctionResult<ReturnType<T>> => {
  const start = performance.now();

  const result: MeasuredFunctionResult<ReturnType<T>> = {
    status: 'success',
    message: 'Function executed successfully',
    data: { value: null, duration: 0 },
  };

  try {
    result.data.value = fn() as ReturnType<T>;
  } catch (error: unknown) {
    result.status = 'error';
    result.message = error instanceof Error ? error.message : 'An error occurred during function execution';
  } finally {
    const end = performance.now();
    const duration = end - start;

    result.data.duration = duration;
  }

  return result;
};

const measureAsync = async <T extends AnyFunction<Promise<unknown>>>(fn: T): Promise<MeasuredFunctionResult<Awaited<ReturnType<T>>>> => {
  const start = performance.now();

  const result: MeasuredFunctionResult<Awaited<ReturnType<T>>> = {
    status: 'success',
    message: 'Function executed successfully',
    data: { value: null, duration: 0 },
  };

  try {
    result.data.value = (await fn()) as Awaited<ReturnType<T>>;
  } catch (error: unknown) {
    result.status = 'error';
    result.message = error instanceof Error ? error.message : 'An error occurred during function execution';
  } finally {
    const end = performance.now();
    const duration = end - start;

    result.data.duration = duration;
  }

  return result;
};

export { measure, measureAsync };
