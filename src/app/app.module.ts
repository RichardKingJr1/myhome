import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgImageSliderModule } from 'ng-image-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from "ngx-spinner";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './templates/inicio/inicio.component';
import { ContatoComponent } from './templates/contato/contato.component';
import { PesquisaComponent } from './templates/pesquisa/pesquisa.component';
import { LoginComponent } from './templates/login/login.component';
import { UnidadeComponent } from './templates/unidade/unidade.component';
import { AddImovelComponent } from './templates/add-imovel/add-imovel.component';
import { AssinarComponent } from './templates/assinar/assinar.component';
import { AddImovelDeslogadoComponent } from './templates/add-imovel-deslogado/add-imovel-deslogado.component';


import { InicioService } from './templates/inicio/service/inicio.service';
import { GlobalService } from './siblings/global.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CriarContaComponent } from './templates/criar-conta/criar-conta.component';
import { SenhaComponent } from './templates/senha/senha.component';

import { AuthGuard } from './siblings/auth.guard';
import { AddGuardGuard } from './siblings/add-guard.guard';



@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContatoComponent,
    PesquisaComponent,
    LoginComponent,
    UnidadeComponent,
    AddImovelComponent,
    CriarContaComponent,
    SenhaComponent,
    AssinarComponent,
    AddImovelDeslogadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    NgImageSliderModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    GooglePlaceModule,
    Ng2ImgMaxModule
  ],
  providers: [GlobalService ,InicioService, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuard, AddGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
