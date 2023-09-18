import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { ILocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _location = new ReplaySubject<ILocation | null>(1);
  location$ = this._location.asObservable();

  constructor() {
    navigator.geolocation.getCurrentPosition(
      (geolocation) => this._location.next(geolocation.coords),
      () => this._location.next(null)
    );
  }
}
