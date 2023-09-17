export type IndividualModelType<T> = T | 'loading' | null;

export function checkIndividualModelType<T>(
  value: IndividualModelType<T>
): value is T {
  return value != null && value != 'loading';
}

export function getIndividualValueOrNull<T>(
  value: IndividualModelType<T>
): T | null {
  return value !== 'loading' ? value : null;
}

export function getIndividualModelIsLoading<T>(
  value: IndividualModelType<T>
): boolean {
  return value === 'loading';
}
