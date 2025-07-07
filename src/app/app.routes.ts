import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/licenciaConducir/home',
    pathMatch: 'full'
  },
  {
    path:'mantenimiento',
    loadChildren: () => import('./components/establishments/router/establishment.routes').then(route => route.ESTABLISHMENT_ROUTES),
  },
  {
    path:'licenciaConducir',
    loadChildren: () => import('./components/licenciaConducir/router/licenciaConducir.routes').then(route => route.LICENCIA_ROUTES),
  },
  {
    path:'users',
    loadChildren: () => import('./components/users/router/users.routes').then(route => route.USERS_ROUTES),
  },
  {
    path:'**',
    loadComponent: () => import('./components/errors/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
