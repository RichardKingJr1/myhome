import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalService } from 'src/app/siblings/global.service';
import { InicioService } from '../inicio/service/inicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeoServiceService } from 'src/app/siblings/geo-service.service';
import { asapScheduler } from 'rxjs';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush// add this (permite ver atualizações assincronas por demanda)
})
export class PesquisaComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private geoService:GeoServiceService, private router: Router, private _inicioService: InicioService, private global: GlobalService, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  //controle do html
  //public screenWidth: number;
  public tamanho = {width: '100%', height: 250};
  public casas: number = 1;
  public velocidade: number = 0.8;

  public m_opcoes: string = "more-search-options-trigger margin-bottom-10 margin-top-30";
  public m_opcoes2: string = "more-search-options relative";

  //processamento de dados
  public tipoBusca: number = 0;

  //processamento de dados
  public imoveis = []; //remover o recebimento do imoveis global

  public n: number = 0;
  public fimSlide = false;

  public dataObj;

  public longitude: number;
  public latitude: number;
  public result;

  public formattedAddress = '';

  //configurando a posição de tendencia de busca
  public posicao = { lat: -23, lng: -46 };
  public defaultBounds = {
    north: this.posicao.lat + 0.1,
    south: this.posicao.lat - 0.1,
    east: this.posicao.lng + 0.1,
    west: this.posicao.lng - 0.1,
  };
  public options = {
    bounds: this.defaultBounds,
    strictBounds: false,
    origin: undefined,
    componentRestrictions: undefined

  };


  ngOnInit(): void {
    /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.renderer2.appendChild(this._document.body, s);

    this.dataObj = {
      alugar:  (this.activatedRoute.snapshot.params.alugar == "true"),
      endereco:  this.activatedRoute.snapshot.params.endereco,
      tipo: Number(this.activatedRoute.snapshot.params.tipo),
      min_preco: Number(this.activatedRoute.snapshot.params.min_preco),
      max_preco: Number(this.activatedRoute.snapshot.params.max_preco),
      min_area: Number(this.activatedRoute.snapshot.params.min_area),
      max_area: Number(this.activatedRoute.snapshot.params.max_area),
      quartos: Number(this.activatedRoute.snapshot.params.quartos),
      banheiros: Number(this.activatedRoute.snapshot.params.banheiros),
      latitude: Number(this.activatedRoute.snapshot.params.lat),
      longitude: Number(this.activatedRoute.snapshot.params.lon),
      n:  this.n,
      tipo_busca: 0 
    };
    

    console.log(this.dataObj);

    //realiza pesquisa via http
    this._inicioService.pesquisarImovel(this.dataObj)
    .subscribe(data=> {  
        this.imoveis = data;
        //console.log(this.imoveis);
        
        /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
        const s = this.renderer2.createElement('script');
        s.type = 'text/javascript';
        s.src = 'assets/scripts/custom.js';
        this.renderer2.appendChild(this._document.body, s);

        this.cdr.detectChanges(); // *trigger change here*

        console.log("lista da pesquisa");
        console.log(this.imoveis);

    });


  }

  //gerencia a entrada de um novo endereço (Google Places auto complete)
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
    console.log(this.formattedAddress);
  }

  onChange(asd){
    if(this.tipoBusca != asd){
      this.tipoBusca = Number(asd);
      //testa se é para alugar ou vender
      let alugar: boolean;
      if(this.activatedRoute.snapshot.params.alugar == "true" || this.activatedRoute.snapshot.params.alugar == "1" ){
        alugar = true;
      }else{
        alugar = false;
      };
      //pesquisa novamente para ajustar a ordem
      this.pesquisar(this.activatedRoute.snapshot.params.endereco, Number(this.activatedRoute.snapshot.params.tipo), Number(this.activatedRoute.snapshot.params.quartos), Number(this.activatedRoute.snapshot.params.banheiros), Number(this.activatedRoute.snapshot.params.min_area), Number(this.activatedRoute.snapshot.params.max_area), Number(this.activatedRoute.snapshot.params.min_preco), Number(this.activatedRoute.snapshot.params.max_preco));      
      //pesquisar(endereco, alugar, tipo, quartos, banheiros, min_area, max_area, min_preco, max_preco)
    }
  }

  pesquisar(endereco, tipo, quartos, banheiros, min_area, max_area, min_preco, max_preco){

    //testa os filtros opcionais
    let in_min_preco: number = 0;
    let in_max_preco: number = 1000000000;
    let in_min_area: number = 0;
    let in_max_area: number = 1000000;
    let in_banheiros: number = 0;
    let in_quartos: number = 0;

    if(max_preco){
      in_max_preco = max_preco;
    };

    if(min_preco){
      in_min_preco = min_preco;
    };

    if(min_area){
      in_min_area = min_area;
    };

    if(max_area){
      in_max_area = max_area;
    }
    
    if(banheiros){
      in_banheiros = banheiros;
    }

    if(quartos){
      in_quartos = quartos;
    }

    //realizar api
    //conecta com api para encontrar longitude e latitude do endereço 
    this.geoService
      .getLocation(endereco)
      .subscribe(data=>{
        console.log(data);
        (this.result = data.results[0].geometry.location);
        //console.log(data.results[0].geometry.location),
        (this.latitude = data.results[0].geometry.location.lat);
        (this.longitude = data.results[0].geometry.location.lng);
        console.log(this.latitude);

        //empacota dados em um objeto
        this.dataObj = {
          alugar: 1,
          endereco: endereco,
          tipo: tipo,
          min_preco: in_min_preco,
          max_preco: in_max_preco,
          min_area: in_min_area,
          max_area: in_max_area,
          quartos: in_quartos,
          banheiros: in_banheiros,
          latitude: this.latitude,
          longitude: this.longitude,
          n:  this.n,
          tipo_busca: this.tipoBusca  
        };

        //realiza pesquisa via http
        this._inicioService.pesquisarImovel(this.dataObj)
        .subscribe(data=> { 
          this.global.changeImoveis(data);  
          this.imoveis = data;
          console.log(this.global.imoveis);
          this.router.navigate(['/pesquisa', endereco, this.latitude, this.longitude, 1, in_min_area, in_max_area, in_min_preco, in_max_preco, in_quartos, in_banheiros, tipo]);

          /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
          const s = this.renderer2.createElement('script');
          s.type = 'text/javascript';
          s.src = 'assets/scripts/custom.js';
          this.renderer2.appendChild(this._document.body, s);

          this.cdr.detectChanges(); // *trigger change here*            
        });
    });
  }

  onScroll(){
    this.dataObj.n = this.dataObj.n + 26;
    console.log(this.dataObj);
    console.log('onscroll funcionando');
    //realiza pesquisa via http
    this._inicioService.pesquisarImovel(this.dataObj)
    .subscribe(data=> {  
        if(data != []){
          /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
          const s0 = this.renderer2.createElement('script');
          s0.type = 'text/javascript';
          s0.src = 'assets/scripts/custom.js';
          this.renderer2.appendChild(this._document.body, s0);
          
          this.imoveis = this.imoveis.concat(data);

          console.log("lista da pesquisa");
          console.log(this.imoveis);
        }else{
          this.fimSlide = true;
        }

        const s = this.renderer2.createElement('script');
        s.type = 'text/javascript';
        s.src = 'assets/scripts/custom.js';
        this.renderer2.appendChild(this._document.body, s);
        
        this.cdr.detectChanges(); // *trigger change here*
    });
  }

  verImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel){
    console.log(id_imovel);
    this.global.changeImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel);
    //this.router.navigate('/unidade', {id: id_imovel, longitude_imovel, latitude_imovel, preco_imovel}); 
    this.router.navigate(['/unidade', id_imovel, longitude_imovel, latitude_imovel, preco_imovel]);
  }

  maisOpcoes() {
    if(this.m_opcoes == "more-search-options-trigger margin-bottom-10 margin-top-30"){
      this.m_opcoes = "more-search-options-trigger margin-bottom-10 margin-top-30 active";
      this.m_opcoes2 = "more-search-options relative active block";
    }else{
      this.m_opcoes = "more-search-options-trigger margin-bottom-10 margin-top-30";
      this.m_opcoes2 = "more-search-options relative";
    };
  }

}
