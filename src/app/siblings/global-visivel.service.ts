import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVisivelService {

  constructor() { }

  public visivel_logado: boolean = false;

  visivelChangeLogado(status){
    this.visivel_logado = status;
  }
}
