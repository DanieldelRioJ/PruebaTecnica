import { isValidDate } from 'rxjs/internal/util/isDate';
export function fromFormToModel(object: any) {
  const entries = Object.entries(object).map(([key, value]) => {
    if (isValidDate(value)) {
      value = `${value.getFullYear()}-${('0' + (value.getMonth() + 1)).slice(
        -2
      )}-${('0' + value.getDate()).slice(-2)}`;
    }
    return [key, value];
  });
  return Object.fromEntries(entries);
}

export function fromModelToForm(object: any) {
  const entries = Object.entries(object).map(([key, value]) => {
    if (typeof value === 'string') {
      const posibleDate = new Date(value);
      if (isValidDate(posibleDate)) {
        value = posibleDate;
      }
    }

    return [key, value];
  });
  return Object.fromEntries(entries);
}
