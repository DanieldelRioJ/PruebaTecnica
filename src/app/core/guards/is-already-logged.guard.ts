import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot
} from '@angular/router';
import { map, of } from 'rxjs';
import { AuthService } from '../store/auth.service';
import { MainRoutes } from '../../routes';

export const isAlreadyLoggedGuard = (next: ActivatedRouteSnapshot) => {
  return of(inject(AuthService).isLoggedIn()).pipe(
    map((isLoggedIn) =>
      isLoggedIn
        ? createUrlTreeFromSnapshot(next, ['/', MainRoutes.MAIN])
        : true
    )
  );
};
