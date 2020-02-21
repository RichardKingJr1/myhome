import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GlobalVisivelService } from './global-visivel.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  //public endereco: string = 'https://localhost/PHP/imobiliaria/';
  public endereco: string = 'https://www.myhomeimobiliaria.com/PHP/';

  //public endreco_foto: string = 'https://localhost/aplicativos/kf-imobiliaria/images/';
  public endreco_foto: string = 'https://www.myhomeimobiliaria.com/assets/images/';

  /*dados do usuario*/
  public logado: boolean = false;

  public destino: string = '/usuario/dados';

  /*dados do imovel selecionado*/
  public latitude: number;
  public longitude: number;
  public preco: number;

  public imovel: number;

  /*lista de imoveis pesquisados*/
  public imoveis;

  /*controle da tab selecionada*/
  public tab:number = 1;
  public observableTab;

  constructor(private visivelGlobal: GlobalVisivelService, private http: HttpClient, private router: Router) { 
    this.observableTab= new BehaviorSubject<number>(this.tab);
  }

  changeImovel(imovel_mudar: number, longitude_mudar: number, latitude_mudar: number, preco_mudar: number){
    this.imovel = imovel_mudar;
    this.latitude = latitude_mudar;
    this.longitude = longitude_mudar;
    this.preco = preco_mudar;
  };

  changeImoveis(imoveis_mudar: number){
    this.imoveis = imoveis_mudar;
  };

  changeDestino(destino_mudar:string){
    this.destino = destino_mudar;
  };

  changeTab(aba:number){
    this.tab = aba;
  }


}
