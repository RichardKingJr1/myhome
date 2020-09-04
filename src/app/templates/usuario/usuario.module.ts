import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { DadosComponent } from './dados/dados.component';
import { PropostasComponent } from './propostas/propostas.component';
import { AssinarUsuarioComponent } from './assinar-usuario/assinar-usuario.component';
import { AprovarPropostaComponent } from './aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './assinar-proprietario-alugar/assinar-proprietario-alugar.component';

//import { AuthGuard } from '../../siblings/auth.guard';

import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [

    DadosComponent,
    PropostasComponent,
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
