import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/authentication' },
  { path: 'authentication', loadChildren: () => import('./pages/authentication/authentication.routes').then(m => m.AUTH_ROUTES) }
];
