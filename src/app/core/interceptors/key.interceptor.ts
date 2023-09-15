import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../store/auth.service';

export function keyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const clonedRequest =
    authService.key != null
      ? req.clone({
          setParams: {
            key: authService.key
          }
        })
      : req;
  return next(clonedRequest);
}
