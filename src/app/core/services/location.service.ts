import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILocation } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private _location = new BehaviorSubject<ILocation | null>(null);
  location$ = this._location.asObservable();

  constructor() {
    navigator.geolocation.getCurrentPosition((geolocation) =>
      this._location.next(geolocation.coords)
    );
  }
}
