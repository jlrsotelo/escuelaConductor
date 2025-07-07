import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path:'',
    loadComponent: () => import('../../users/user/user.component').then(m => m.UserComponent),
    children: [
      {
        path:'login',
        loadComponent: () => import('../../users/login/login.component').then(m => m.LoginComponent)
      }
    ]
  }
];
