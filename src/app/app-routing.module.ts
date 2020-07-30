import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './templates/inicio/inicio.component';
import { ContatoComponent } from './templates/contato/contato.component';
import { PesquisaComponent } from './templates/pesquisa/pesquisa.component';
import { LoginComponent } from './templates/login/login.component';
import { UnidadeComponent } from './templates/unidade/unidade.component';
import { AddImovelComponent } from './templates/add-imovel/add-imovel.component';
import { AddImovelDeslogadoComponent } from './templates/add-imovel-deslogado/add-imovel-deslogado.component';
import { VisitarComponent } from './templates/visitar/visitar.component';
import { CriarContaComponent } from './templates/criar-conta/criar-conta.component';
import { SenhaComponent } from './templates/senha/senha.component';

import { AuthGuard } from './siblings/auth.guard';
import { AddGuardGuard } from './siblings/add-guard.guard';


/*import { MudarSenhaComponent } from './templates/usuario/mudar-senha/mudar-senha.component';
import { DadosComponent } from './templates/usuario/dados/dados.component';
import { MinhasPropriedadesComponent } from './templates/usuario/minhas-propriedades/minhas-propriedades.component';
import { AlugandoComponent } from './templates/usuario/alugando/alugando.component';
import { PropostasComponent } from './templates/usuario/propostas/propostas.component';
import { AssinarProprietarioComponent } from './templates/usuario/assinar-proprietario/assinar-proprietario.component';
import { AssinarUsuarioComponent } from './templates/usuario/assinar-usuario/assinar-usuario.component';
import { AprovarPropostaComponent } from './templates/usuario/aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './templates/usuario/assinar-proprietario-alugar/assinar-proprietario-alugar.component';*/


const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent},
  { path: 'contato', component: ContatoComponent},
  { path: 'enviar-propriedade', canActivate: [AddGuardGuard], component: AddImovelComponent},
  //{ path: 'enviar-propriedade', component: AddImovelComponent},
  { path: 'add-imovel-deslogado', component: AddImovelDeslogadoComponent},
  { path: 'pesquisa/:endereco/:lat/:lon/:alugar/:min_area/:max_area/:min_preco/:max_preco/:quartos/:banheiros/:tipo', component: PesquisaComponent},
  { path: 'unidade/:id/:long/:lat/:preco', component: UnidadeComponent},
  { path: 'visitar/:id', component: VisitarComponent},
  { path: 'login', component: LoginComponent},
  { path: 'criar-conta', component: CriarContaComponent},
  { path: 'senha', component: SenhaComponent},
  { path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
