import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly API_KEY_ITEM = 'API_KEY_ITEM';

  storage = localStorage;
  private _key: string | null = this.storage.getItem(this.API_KEY_ITEM);

  set key(key: string | null) {
    if (key == null) {
      this.deleteKey();
    } else {
      this.storage.setItem(this.API_KEY_ITEM, key);
      this._key = key;
    }
  }

  get key(): string | null {
    return this._key;
  }

  isLoggedIn() {
    return this.key != null;
  }

  deleteKey() {
    this.storage.removeItem(this.API_KEY_ITEM);
    this._key = null;
  }
}
