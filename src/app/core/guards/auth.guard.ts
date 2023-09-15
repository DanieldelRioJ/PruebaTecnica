import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot
} from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from '../store/auth.service';
import { MainRoutes } from '../../routes';

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return of(inject(AuthService).isLoggedIn()).pipe(
    map((isLoggedIn) =>
      isLoggedIn
        ? true
        : createUrlTreeFromSnapshot(next, ['/', MainRoutes.LOGIN])
    )
  );
};
