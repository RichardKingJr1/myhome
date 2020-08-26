import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DadosComponent } from './dados/dados.component';

const routes: Routes = [
  { path: '', redirectTo: '/dados', pathMatch: 'full'},
  { path: 'dados',  component: DadosComponent},
  { path: "**", redirectTo: '/dados'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
