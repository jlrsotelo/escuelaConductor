import { Routes } from '@angular/router';

export const LICENCIA_ROUTES: Routes = [
  {
    path:'',
    loadComponent: () => import('../licencia/licencia.component').then(m => m.LicenciaComponent),
    children: [
      {
        path: 'consulta/:id',
        loadComponent: () => import('../establishment-list/establishment-list.component').then(m => m.EstablishmentListComponent)
      },
      {
        path:'home',
        loadComponent: () => import('../home/home.component').then(m => m.HomeComponent),
      },
    ]
  }
];
