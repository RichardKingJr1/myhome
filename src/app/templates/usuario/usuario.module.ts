import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MudarSenhaComponent } from './mudar-senha/mudar-senha.component';
import { DadosComponent } from './dados/dados.component';
import { MinhasPropriedadesComponent } from './minhas-propriedades/minhas-propriedades.component';
import { AlugandoComponent } from './alugando/alugando.component';
import { PropostasComponent } from './propostas/propostas.component';
import { AssinarProprietarioComponent } from './assinar-proprietario/assinar-proprietario.component';
import { AssinarUsuarioComponent } from './assinar-usuario/assinar-usuario.component';
import { AprovarPropostaComponent } from './aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './assinar-proprietario-alugar/assinar-proprietario-alugar.component';

//import { AuthGuard } from '../../siblings/auth.guard';

import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [
    MudarSenhaComponent,
    DadosComponent,
    MinhasPropriedadesComponent,
    AlugandoComponent,
    PropostasComponent,
    AssinarProprietarioComponent,
    AssinarUsuarioComponent,
    AprovarPropostaComponent,
    AssinarProprietarioAlugarComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    HttpClientModule
  ]

})
export class UsuarioModule { }
