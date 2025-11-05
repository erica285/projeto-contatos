import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'listar-contatos',
    loadComponent: () => import('./listar-contatos/listar-contatos.page').then( m => m.ListarContatosPage)
  },
  {
    path: 'listar-contatos',
    loadComponent: () => import('./listar-contatos/listar-contatos.page').then( m => m.ListarContatosPage)
  },
];
