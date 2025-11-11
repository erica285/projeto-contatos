import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'listar-contatos', loadComponent: () => import('./listar-contatos/listar-contatos.page').then(m => m.ListarContatosPage) },
  { path: 'adicionar-contato', loadComponent: () => import('./adicionar-contato/adicionar-contato.page').then(m => m.AdicionarContatoPage) },
];