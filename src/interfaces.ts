export type Status = 'success' | 'error' | 'warning';

export type Optional<T> = T | null | undefined;

export interface Result {
  status: Status;
  message: string;
}
