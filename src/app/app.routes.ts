import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './components/errors/page-not-found/page-not-found.component';
import { EstablishmentListComponent } from './components/cnt-establishments/establishment-list/establishment-list.component';
import { EstablishmentIndexComponent } from './components/mnt-establishments/establishment-index/establishment-index.component';
import { EstablishmentAddComponent } from './components/mnt-establishments/establishment-add/establishment-add.component';


export const routes: Routes = [
  {
    path: 'establecimiento/mantenimiento',
    component: EstablishmentIndexComponent
  },
  {
    path:'establecimiento/add',
    component: EstablishmentAddComponent
  },
  {
    path:'establecimiento/add/:id',
    loadComponent: () => import('./components/mnt-establishments/establishment-add/establishment-add.component').then(m => m.EstablishmentAddComponent),
  },
  {
    path: 'establecimiento/consulta/:id',
    component: EstablishmentListComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];
