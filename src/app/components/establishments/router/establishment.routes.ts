import { Routes } from '@angular/router';
import {authGuard} from '../../../auth.guard';

export const ESTABLISHMENT_ROUTES: Routes = [
  {
    path:'establecimiento',
    loadComponent: () => import('../establishment/establishment.component').then(m => m.EstablishmentComponent),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('../establishment-index/establishment-index.component').then(m => m.EstablishmentIndexComponent),
        canActivate: [authGuard]
      },
      {
        path:'add',
        loadComponent: () => import('../establishment-add/establishment-add.component').then(m => m.EstablishmentAddComponent),
        canActivate: [authGuard]
      },
      {
        path:'add/:id',
        loadComponent: () => import('../establishment-add/establishment-add.component').then(m => m.EstablishmentAddComponent),
        canActivate: [authGuard]
      }
    ]
  }

];
