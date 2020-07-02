import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { GlobalService } from '../../../siblings/global.service';

@Injectable({
  providedIn: 'root'
})
export class AddImovelService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  adicionarImovel(dataObj)  {
    return this.http.post(this.global.endereco+'adicionar.php', dataObj, {responseType: "text"}).pipe(catchError(this.errorHandler));
                    
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
