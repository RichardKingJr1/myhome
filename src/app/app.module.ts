import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgImageSliderModule } from 'ng-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
import { AlugarComponent } from './templates/alugar/alugar.component';
import { VisitarComponent } from './templates/visitar/visitar.component';
import { AssinarComponent } from './templates/assinar/assinar.component';
import { AddImovelDeslogadoComponent } from './templates/add-imovel-deslogado/add-imovel-deslogado.component';

/*import { MudarSenhaComponent } from './templates/usuario/mudar-senha/mudar-senha.component';
import { DadosComponent } from './templates/usuario/dados/dados.component';
import { MinhasPropriedadesComponent } from './templates/usuario/minhas-propriedades/minhas-propriedades.component';
import { AlugandoComponent } from './templates/usuario/alugando/alugando.component';
import { PropostasComponent } from './templates/usuario/propostas/propostas.component';
import { AprovarPropostaComponent } from './templates/usuario/aprovar-proposta/aprovar-proposta.component';
import { AssinarProprietarioAlugarComponent } from './templates/usuario/assinar-proprietario-alugar/assinar-proprietario-alugar.component';
import { AssinarProprietarioComponent } from './templates/usuario/assinar-proprietario/assinar-proprietario.component';
import { AssinarUsuarioComponent } from './templates/usuario/assinar-usuario/assinar-usuario.component';*/

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

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ContatoComponent,
    PesquisaComponent,
    LoginComponent,
    UnidadeComponent,
    AddImovelComponent,
    VisitarComponent,
    AlugarComponent,
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
    Ng2ImgMaxModule,
    CarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwpIoGAWFL4xQnYb7ZT_p9lWQugkhTg10'
    }),
    AgmJsMarkerClustererModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GlobalService ,InicioService, {provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuard, AddGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
