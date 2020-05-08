import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContatoService } from './service/contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(private _contatoService: ContatoService, private router: Router) { }

  ngOnInit(): void {
  }

  enviarMensagem(nome, email, mensagem){

    let dataObj = {
      nome: nome,
      email: email,
      mensagem: mensagem
    }

    this._contatoService.enviarMensagem(dataObj)
    .subscribe(data=> { 
      console.log(data);
      window.alert('Mensagem enviada, entraremos em contato pelo email fornecido');
      this.router.navigateByUrl('/inicio');    
    });

  }

}
