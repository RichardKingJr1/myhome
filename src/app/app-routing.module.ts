import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './templates/inicio/inicio.component';
import { PesquisaComponent } from './templates/pesquisa/pesquisa.component';

import { UnidadeComponent } from './templates/unidade/unidade.component';
import { AddImovelDeslogadoComponent } from './templates/add-imovel-deslogado/add-imovel-deslogado.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent},
  { path: 'add-imovel-deslogado', component: AddImovelDeslogadoComponent},
  { path: 'pesquisa/:endereco/:lat/:lon/:alugar/:min_area/:max_area/:min_preco/:max_preco/:quartos/:banheiros/:tipo', component: PesquisaComponent},
  { path: 'unidade/:id/:long/:lat/:preco', component: UnidadeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
