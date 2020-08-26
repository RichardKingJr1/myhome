import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { DadosComponent } from './dados/dados.component';

//import { AuthGuard } from '../../siblings/auth.guard';

import { UsuarioRoutingModule } from './usuario-routing.module';


@NgModule({
  declarations: [

    DadosComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    HttpClientModule
  ]

})
export class UsuarioModule { }
