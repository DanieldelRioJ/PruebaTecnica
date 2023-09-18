import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export type QueryParamsInputObject = Record<
  string,
  string | number | boolean | ReadonlyArray<string | number | boolean>
>;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  get<T>(url: string, queryParams: QueryParamsInputObject) {
    const params = new HttpParams({ fromObject: queryParams });
    return this._httpClient.get<T>(url, { params });
  }
}
