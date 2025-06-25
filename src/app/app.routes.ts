import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/establecimiento',
    pathMatch: 'full'
  },
  {
    path:'establecimiento',
    loadChildren: () => import('./components/establishments/router/establishment.routes').then(route => route.ESTABLISHMENT_ROUTES),
  },
  {
    path:'**',
    loadComponent: () => import('./components/errors/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
