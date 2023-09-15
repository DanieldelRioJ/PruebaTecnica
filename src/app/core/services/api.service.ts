import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly _httpClient: HttpClient) {}

  get<T>(url: string, queryParams: any) {
    const params = new HttpParams({ fromObject: queryParams });
    return this._httpClient.get<string>(url, { params: params });
  }
}
