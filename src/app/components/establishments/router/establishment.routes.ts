import { Routes } from '@angular/router';

export const ESTABLISHMENT_ROUTES: Routes = [
  {
    path:'establecimiento',
    loadComponent: () => import('../establishment/establishment.component').then(m => m.EstablishmentComponent),
    children: [
      {
        path: 'mantenimiento',
        loadComponent: () => import('../establishment-index/establishment-index.component').then(m => m.EstablishmentIndexComponent)
      },
      {
        path:'add',
        loadComponent: () => import('../establishment-add/establishment-add.component').then(m => m.EstablishmentAddComponent)
      },
      {
        path:'add/:id',
        loadComponent: () => import('../establishment-add/establishment-add.component').then(m => m.EstablishmentAddComponent)
      },
      {
        path: 'consulta/:id',
        loadComponent: () => import('../establishment-list/establishment-list.component').then(m => m.EstablishmentListComponent)
      }
    ]
  }

];
