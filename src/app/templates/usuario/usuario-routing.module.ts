import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DadosComponent } from './dados/dados.component';
import { MinhasPropriedadesComponent } from './minhas-propriedades/minhas-propriedades.component';
import { PropostasComponent } from './propostas/propostas.component';
import { AssinarProprietarioComponent } from './assinar-proprietario/assinar-proprietario.component';
import { AssinarUsuarioComponent } from './assinar-usuario/assinar-usuario.component';
import { AprovarPropostaComponent } from './aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './assinar-proprietario-alugar/assinar-proprietario-alugar.component';

const routes: Routes = [
  { path: '', redirectTo: '/dados', pathMatch: 'full'},
  { path: 'aprovar-proposta',  component: AprovarPropostaComponent},
  { path: 'dados',  component: DadosComponent},
  { path: 'minhaspropriedades',  component: MinhasPropriedadesComponent},
  { path: 'propostas',  component: PropostasComponent},
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
