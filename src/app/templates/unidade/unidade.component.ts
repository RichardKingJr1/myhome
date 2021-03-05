import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UnidadeService } from './service/unidade.service';
import { GlobalService } from 'src/app/siblings/global.service';
import { InicioService } from '../inicio/service/inicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {

  //mapa
  public zoom = 15;

  public lat = parseFloat(this.activatedRoute.snapshot.params.lat);
  public lng = parseFloat(this.activatedRoute.snapshot.params.long);

  //controle do html
  public screenWidth: number;
  public tamanho = {width: '33%', height: 350};
  public casas: number = 3;
  public velocidade: number = 0.8;

  public visitar_dom: string = "boxed-widget booking-widget margin-top-010";

  //processamento de dadoa
  public imovel;
  public imoveis;
  public similares;
  public id_imovel;

  //controle de views
  public foto_view: boolean = true;
  public video_view: boolean = false;
  public mapa_view: boolean = false;

  public imageObject: Array<object> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _inicioService: InicioService, public global: GlobalService, private _unidadeservice: UnidadeService, private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {

    console.log(this.lat);

   console.log(this.activatedRoute.snapshot.params);

    this.id_imovel = this.activatedRoute.snapshot.params.id;

    /*insere o script do jquery no template*/
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.renderer2.appendChild(this._document.body, s); 

    /*controla o tamanho da tela e ajusta o html/css de acordo com a medida*/
    this.screenWidth = window.innerWidth;

    if(this.screenWidth <= 768){
      this.tamanho = {width: '100%', height: 350};
      this.casas = 1;
      this.velocidade = 0.4;
      this.visitar_dom = "boxed-widget booking-widget";
    }


    /*busca dados do imovel sendo analizado*/
    this._unidadeservice.buscarImovel(this.id_imovel)
    .subscribe(data=> { 
      this.imovel = data;
      console.log(this.imovel);  

      if(this.imovel.video != '' && this.imovel.video != null){
        this.imovel.video=this.sanitizer.bypassSecurityTrustResourceUrl(this.imovel.video);
      };     

      //entrega fotos para o slider
      for (let i = 0; i < this.imovel.tamanho; i++) {

        this.imageObject.push({
          image: this.global.endreco_foto+'imoveis/'+this.imovel.id_imovel+'_'+i+'.jpg',
          thumbImage: this.global.endreco_foto+'imoveis/'+this.imovel.id_imovel+'_'+i+'.jpg'
        });
        //console.log(this.imageObject);

      }
    });

    /*busca os imoveis em destaque*/
    this._inicioService.buscarImovelDestaque()
    .subscribe(data=> { 
      this.imoveis = data;
      //console.log(this.imoveis);   
    });

    /*buscar imoveis similares*/
    let dataObj = {
      id_imovel: this.id_imovel,
      latitude: this.activatedRoute.snapshot.params.lat,
      longitude: this.activatedRoute.snapshot.params.long,
      max_preco: (this.activatedRoute.snapshot.params.preco*1.5),
      min_preco: (this.activatedRoute.snapshot.params.preco*0.5),
    };

    //console.log(dataObj);

    this._unidadeservice.buscarSimilares(dataObj)
    .subscribe(data=> { 
      this.similares = data;
      console.log('SIMILARES');
      console.log(this.similares);   
    });

  }

  alugar(id_imovel){
    this.global.changeImoveis(id_imovel);
    this.global.changeDestino('/alugar');
    this.router.navigate(['/alugar']);
  }

  enviarMensagem(nome, email, telefone, mensagem, id_imovel){
    console.log(id_imovel);

    let dataObj = {
      id: id_imovel,
      nome: nome,
      email: email,
      telefone: telefone,
      mensagem: mensagem
    }

    this._unidadeservice.enviarMensagem(dataObj)
    .subscribe(data=> { 
      //this.imovel = data;
      //console.log(this.imovel);   
      window.alert('Mensagem enviada, entraremos em contato assim que possivel');
    });
  };

  verImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel){
    console.log(id_imovel);
    //salva os dados do proximo imovel q vc quer ver
    this.global.changeImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel);
    //reinicia o modulo direcionando para um novo imovel
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/unidade', id_imovel, longitude_imovel, latitude_imovel, preco_imovel]);
  }); 
  }

  trocarView(x){
    this.foto_view = false;
    this.video_view = false;
    this.mapa_view = false;

    switch(x){
      case 1:
        this.foto_view = true;
        break;
      case 2:
        this.video_view = true;
        break
      case 3:
        this.mapa_view = true;
        break;
    };
  };

}
