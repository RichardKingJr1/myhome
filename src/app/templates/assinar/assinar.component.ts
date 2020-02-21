import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as assinatura from '../../../assets/scripts/d4sign.js'

@Component({
  selector: 'app-assinar',
  templateUrl: './assinar.component.html',
  styleUrls: ['./assinar.component.css']
})
export class AssinarComponent implements OnInit {

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { }

  ngOnInit(): void {

    /* adiciona tag de script no modulo (angular nao permite fazer diretament)*/
    /*const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/d4sign.js';
    this.renderer2.appendChild(this._document.body, s);*/ 

    assinatura.d4sign.configure({
        container: "signature-div",
        key: "{UUID-DOCUMENT}",
        protocol: "https",
        host: "secure.d4sign.com.br/embed/viewblob",
        signer: {
            email: "email@signatario.com",
            key_signer: "{CHAVE-DO-SIGNATARIO}"
        },
        width: '1025',
        height: '400',
        callback: function(event) {
          if (event.data === "signed") {
            alert('ASSINADO');
          }else if (event.data === "wrong-data") {
            alert('USUARIO CLICOU NO LINK: Meus dados estão errados.'); 
            //ou redirecionar o usuário para uma página onde poderá alterar os seus dados.
          }else{
            alert('error');
          };
        }
    });
  }

  

}
