import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

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
import { AtualizarFotosComponent } from './atualizar-fotos/atualizar-fotos.component';

import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';


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
    AssinarProprietarioAlugarComponent,
    AtualizarFotosComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    MatCheckboxModule,
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class UsuarioModule { }
