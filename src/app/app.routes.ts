import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {IsLoggedIn} from "./pages/authentication/authentication.guard";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/authentication' },
  { path: 'welcome', canActivate: [IsLoggedIn] ,component: WelcomeComponent },
  // { path: 'welcome',component: WelcomeComponent },
  { path: 'authentication', loadChildren: () => import('./pages/authentication/authentication.routes').then(m => m.AUTH_ROUTES) },
];
