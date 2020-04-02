import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { GlobalService } from '../../../siblings/global.service';
import { InicioService } from '../../inicio/service/inicio.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  buscarImovel(id_imovel): Observable<any> {
    return this.http.post<any>(this.global.endereco+'buscar-imovel-unidade.php', id_imovel).pipe(catchError(this.errorHandler));
                    
  }

  enviarMensagem(dataObj) {
    return this.http.post(this.global.endereco+'mensagem-imovel.php', dataObj, {responseType: 'text'}).pipe(catchError(this.errorHandler));
                    
  }

  buscarSimilares(dataObj_enviado): Observable<any[any]> {
    return this.http.post(this.global.endereco+'imoveis-similares.php',dataObj_enviado).pipe(catchError(this.errorHandler));
                  
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
