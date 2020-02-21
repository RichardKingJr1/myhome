import { Component, OnInit, HostListener } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from './siblings/global.service';
import { NavigationEnd, NavigationStart, Router} from '@angular/router';
import { GlobalVisivelService } from './siblings/global-visivel.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public opened: boolean = false;

  public login_view: boolean = true;

  //public location: string; // local onde esta site
  //this.location = window.location.href;

    /*<------indicar a aba aberta------->*/
    public inicio: string = "";
    public contato: string = "";
    public anuncie: string = "";

    public rota;

  constructor(private global: GlobalService, private http: HttpClient, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private router: Router, public visivelGlobal: GlobalVisivelService) { 
   

    router.events.subscribe((val) => {
      // see also 
      if(val instanceof NavigationEnd){
        console.log(val.url); 
        this.rota = val.url;  //salva a rota atual fora dessa função para usala em outra função
        this.inicio = "";
        this.contato = "";
        this.anuncie = "";

        switch (val.url) {
          case '/':
            this.inicio = "current";
            break;
          case '/inicio':
            this.inicio = "current";
            break;
          case '/contato':
            this.contato = "current";
            break;
            case '/enviar-propriedade':
              this.anuncie = "current";
              break;  
          default:

        }
      }
    });
    
  }

  /*<-----fim indicar aba---------->*/

  public logado_status = this.global.logado;

  /*<------ajuste tamanho da janela------>*/
  public screenWidth: number;
  public direita_hidden: boolean = false;
  public espaco: string = "espaco1";
  
  ngOnInit() {

    console.log(window.location.pathname);

    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.renderer2.appendChild(this._document.body, s);

    /*controla o tamanho da tela e ajusta o html/css de acordo com a medida*/
    this.screenWidth = window.innerWidth;

    if(this.screenWidth <= 992){
      this.direita_hidden = true;
      this.login_view = false;
    }

    if(this.screenWidth <= 1239 && this.screenWidth >= 992){
      this.espaco = "espaco2";
      this.login_view = false;
    }


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;

    if(this.screenWidth <= 992){
      this.direita_hidden = true;
      this.login_view = false;
    }else{
      this.direita_hidden = false;
    }

    if(this.screenWidth <= 1239 && this.screenWidth >= 992){
      this.espaco = "espaco2";
      this.login_view = false;
    }else{
      this.espaco = "espaco1";
    };

    if(this.screenWidth >= 1239){
      this.login_view = true;
    }

  }
  /*<----fim ajuste tamanho da janela--->*/ 

  logar(){
    this.global.changeDestino('/usuario/dados');
    this.router.navigate(['/login']);
  }

  logar2(){
    this.opened = false;
    this.global.changeDestino('/usuario/dados');
    this.router.navigate(['/login']);
  }

  title = 'kf-imobiliaria-v2';

}
