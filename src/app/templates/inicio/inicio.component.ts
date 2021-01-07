import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InicioService } from './service/inicio.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
import { GeoServiceService } from 'src/app/siblings/geo-service.service';

import { OwlOptions } from "ngx-owl-carousel-o";
//import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoHeight: false,
    autoWidth: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  public slidesStore = [0, 1,2,3,4];

  public m_opcoes: string = "more-search-options-trigger";
  public m_opcoes2: string = "more-search-options";

  public alugar: boolean = true;
  public comprar: boolean = false;

  public imoveis: any;

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

  constructor(private geoService: GeoServiceService, private _inicioService: InicioService, public global: GlobalService, private router: Router, private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { } 

  /*enviar dados para parent sobra aba sendo utilizada*/
  

  ngOnInit(): void {

    /*this._inicioService.teste()
    .subscribe(data=> { 
      this.slidesStore = data;
      console.log(data);   
    });*/

    this.global.changeTab(1);

    /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.renderer2.appendChild(this._document.body, s); 

    //buasca os imoveis em destaque
    this._inicioService.buscarImovelDestaque()
    .subscribe(data=> { 
      this.imoveis = data;
      console.log(data);   
    });
    
  }

  //gerencia a entrada de um novo endereço (Google Places auto complete)
  public handleAddressChange(address: any) {
    this.formattedAddress = address.formatted_address;
    console.log(this.formattedAddress);
  }

  alugarf(){
    this.alugar = true;
    this.comprar = false;
  }

  /*comprarf(){
    this.alugar = false;
    this.comprar = true;
  };*/

  verImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel){
    console.log(id_imovel);
    this.global.changeImovel(id_imovel, longitude_imovel, latitude_imovel, preco_imovel);
    this.router.navigate(['/unidade', id_imovel, longitude_imovel, latitude_imovel, preco_imovel]);
  };

  pesquisar(endereco, tipo, min_preco, max_preco, min_area, max_area, quartos, banheiros){

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
        let dataObj = {
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
          alugar: this.alugar,
          tipo_busca: 0
        };

        this.router.navigate(['/pesquisa', endereco, this.latitude, this.longitude, this.alugar, in_min_area, in_max_area, in_min_preco, in_max_preco, in_quartos, in_banheiros, tipo]);

        //realiza pesquisa via http
        /*this._inicioService.pesquisarImovel(dataObj)
          .subscribe(data=> { 
            this.global.changeImoveis(data);
            this.router.navigate(['/pesquisa', endereco, this.latitude, this.longitude, this.alugar, in_min_area, in_max_area, in_min_preco, in_max_preco, in_quartos, in_banheiros]);     
        });*/
    });

  }


  /*  Searh Form More Options*/

  maisOpcoes() {
    if(this.m_opcoes == "more-search-options-trigger"){
      this.m_opcoes = "more-search-options-trigger active";
      this.m_opcoes2 = "more-search-options active";
    }else{
      this.m_opcoes = "more-search-options-trigger";
      this.m_opcoes2 = "more-search-options";
    };
  }

  /*  Fim Form More*/




}
