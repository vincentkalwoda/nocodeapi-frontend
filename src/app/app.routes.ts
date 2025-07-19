import { Routes } from '@angular/router';
import {CanActivateUserGuard} from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./components/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./components/private/private.module').then(m => m.PrivateModule),
    canActivate: [CanActivateUserGuard],
  }
];

