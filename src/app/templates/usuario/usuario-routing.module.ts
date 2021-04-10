import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MudarSenhaComponent } from './mudar-senha/mudar-senha.component';
import { DadosComponent } from './dados/dados.component';
import { MinhasPropriedadesComponent } from './minhas-propriedades/minhas-propriedades.component';
import { AlugandoComponent } from './alugando/alugando.component';
import { PropostasComponent } from './propostas/propostas.component';
import { AssinarProprietarioComponent } from './assinar-proprietario/assinar-proprietario.component';
import { AssinarUsuarioComponent } from './assinar-usuario/assinar-usuario.component';
import { AprovarPropostaComponent } from './aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './assinar-proprietario-alugar/assinar-proprietario-alugar.component';
import { AtualizarFotosComponent } from './atualizar-fotos/atualizar-fotos.component';

const routes: Routes = [
  { path: '', redirectTo: '/dados', pathMatch: 'full'},
  /*{ path: 'mudarsenha', canActivate: [AuthGuard], component: MudarSenhaComponent},
  { path: 'aprovar-proposta', canActivate: [AuthGuard], component: AprovarPropostaComponent},
  { path: 'dados', canActivate: [AuthGuard], component: DadosComponent},
  { path: 'minhaspropriedades', canActivate: [AuthGuard], component: MinhasPropriedadesComponent},
  { path: 'alugando', canActivate: [AuthGuard], component: AlugandoComponent},
  { path: 'propostas', canActivate: [AuthGuard], component: PropostasComponent},
  { path: 'assinarproprietario/:id', canActivate: [AuthGuard], component: AssinarProprietarioComponent},
  { path: 'assinarusuario/:id', canActivate: [AuthGuard], component: AssinarUsuarioComponent},
  { path: 'assinar-usuario-proprietario/:id', canActivate: [AuthGuard], component: AssinarProprietarioAlugarComponent},*/
  { path: 'mudarsenha', component: MudarSenhaComponent},
  { path: 'aprovar-proposta',  component: AprovarPropostaComponent},
  { path: 'dados',  component: DadosComponent},
  { path: 'minhaspropriedades',  component: MinhasPropriedadesComponent},
  { path: 'alugando',  component: AlugandoComponent},
  { path: 'propostas',  component: PropostasComponent},
  { path: 'fotos/:id/:numero', component: AtualizarFotosComponent},
  { path: 'assinarproprietario/:id',  component: AssinarProprietarioComponent},
  { path: 'assinarusuario/:id',  component: AssinarUsuarioComponent},
  { path: 'assinar-usuario-proprietario/:id', component: AssinarProprietarioAlugarComponent},
  { path: "**", redirectTo: '/dados'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
