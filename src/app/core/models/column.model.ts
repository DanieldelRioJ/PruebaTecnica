export interface Column {
  id: string;
  name: string;
  suffix?: string;
  type?: ColumnTypes;
}

export enum ColumnTypes {
  DATE = 'date'
}
