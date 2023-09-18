import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { isAlreadyLoggedGuard } from './core/guards/is-already-logged.guard';
export enum MainRoutes {
  LOGIN = 'login',
  MAIN = 'main'
}

export const routes: Routes = [
  {
    path: MainRoutes.LOGIN,
    loadComponent: () =>
      import('./features/login/components/login.component').then(
        (mod) => mod.LoginComponent
      ),
    canActivate: [isAlreadyLoggedGuard],
    data: { animation: 'LoginPage' }
  },
  {
    path: MainRoutes.MAIN,
    loadComponent: () =>
      import('./features/main/components/main.component').then(
        (mod) => mod.MainComponent
      ),
    canActivate: [authGuard],
    data: { animation: 'MainPage' }
  },
  { path: '', redirectTo: MainRoutes.MAIN, pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent
      )
  }
];
