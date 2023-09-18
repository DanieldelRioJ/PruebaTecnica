import { Column, ColumnTypes } from '../../../../../core/models/column.model';

export const MainOutputTableColumns: Column[] = [
  {
    id: 'datetime',
    name: 'MAIN.TABLE.COLUMNS.DATETIME'
  },
  {
    id: 'temp',
    name: 'MAIN.TABLE.COLUMNS.TEMPERATURE',
    suffix: 'ºC'
  },
  {
    id: 'feelslike',
    name: 'MAIN.TABLE.COLUMNS.FEELSLIKE',
    suffix: 'ºC'
  },
  {
    id: 'humidity',
    name: 'MAIN.TABLE.COLUMNS.HUMIDITY',
    suffix: '%'
  },
  {
    id: 'precipprob',
    name: 'MAIN.TABLE.COLUMNS.PRECIP',
    suffix: '%'
  },
  {
    id: 'windspeed',
    name: 'MAIN.TABLE.COLUMNS.WINDSPEED',
    suffix: 'km/h'
  },
  {
    id: 'solarradiation',
    name: 'MAIN.TABLE.COLUMNS.SOLAR_RADIATION',
    suffix: 'W/m2'
  }
];
