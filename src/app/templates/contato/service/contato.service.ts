import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { GlobalService } from '../../../siblings/global.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  enviarMensagem(dataObj)  {
    return this.http.post(this.global.endereco+'contato.php', dataObj, {responseType: "text"}).pipe(catchError(this.errorHandler));
                    
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
  
}
