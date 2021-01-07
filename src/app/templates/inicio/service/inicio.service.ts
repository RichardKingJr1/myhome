import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { GlobalService } from '../../../siblings/global.service';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  pesquisarImovel(dataObj_enviado): Observable<any[any]> {
    return this.http.post(this.global.endereco+'pesquisar-imovel.php',dataObj_enviado).pipe(catchError(this.errorHandler));
                  
  }

  buscarImovelDestaque(): Observable<any[any]> {
    return this.http.get<any>(this.global.endereco+'buscar-imovel.php').pipe(catchError(this.errorHandler));
                    
  }

  teste(): Observable<any[any]> {
    return this.http.get<any>('./assets/teste.json').pipe(catchError(this.errorHandler));
                    
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
