import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-add-imovel-deslogado',
  templateUrl: './add-imovel-deslogado.component.html',
  styleUrls: ['./add-imovel-deslogado.component.css']
})
export class AddImovelDeslogadoComponent implements OnInit {

  constructor(private router: Router, public global: GlobalService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  logar(){
    this.global.changeDestino('/enviar-propriedade');
    this.router.navigate(['/login']);
  };

  contato(nome, email, telefone){
    let dataObj = {
      nome: nome,
      email: email,
      telefone: telefone
    }

    this.http.post(this.global.endereco+'contato-cadastro.php', dataObj)
    .subscribe(data=> { 
      console.log(data);
      window.alert('Mensagem enviada, entraremos em contato pelo telefone fornecido');
      this.router.navigateByUrl('/inicio');    
    });
  };
}
