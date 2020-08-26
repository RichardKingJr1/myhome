import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  public resposta;
  public dados;

  constructor(private http: HttpClient, private global: GlobalService, private router: Router) { }

  ngOnInit(): void {

    this.http.post(this.global.endereco+'dados-usuario.php', this.global.id_usuario)
      .subscribe(data=> {
        this.dados = data;   
    });
  }

  salvarDados(){

    let dataObj = {
      id: this.global.id_usuario,
      nome: this.dados.nome,
      snome: this.dados.sobrenome,
      email: this.dados.email,
      telefone: this.dados.telefone
    };

    this.http.post(this.global.endereco+'mudar-dados.php',dataObj)
      .subscribe(data=> {
        this.resposta = data;
        window.alert('Dados alterados com sucesso');
        this.router.navigate(['/usuario/dados']);
    });
  };

  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }
}
