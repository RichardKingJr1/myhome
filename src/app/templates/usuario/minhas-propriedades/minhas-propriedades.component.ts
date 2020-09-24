import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-minhas-propriedades',
  templateUrl: './minhas-propriedades.component.html',
  styleUrls: ['./minhas-propriedades.component.css']
})
export class MinhasPropriedadesComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private router: Router) { }

  public respostas;
  public respostas_livre;

  public id_remover_propriedade: number;
  public ctrl_remover: boolean = false;


  public id_solicitar_saida: number;
  public ctrl_solicitar: boolean = false;

  ngOnInit(): void {
    this.http.post(this.global.endereco+'buscar-propriedades.php', this.global.id_usuario)
      .subscribe(data=> {
        this.respostas = data;   
    });
    this.http.post(this.global.endereco+'buscar-propriedades-livres.php', this.global.id_usuario)
      .subscribe(data=> {
        this.respostas_livre = data;   
    });
  }

  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }

  removerPropriedade(id_imovel){
    this.id_remover_propriedade = id_imovel;
    this.ctrl_remover = true;
  }

  removerCancelar(){
    this.ctrl_remover = false;
  }

  removerConfirmar(){
    this.http.post(this.global.endereco+'remover-propriedades.php', this.id_remover_propriedade)
      .subscribe(data=> {
        this.ctrl_remover = false;
        window.alert('Entraremos em contato para dar continuação a solicitação de remoção do imovel ');
    });

  }

  solicitarSaida(id_imovel){
    this.id_solicitar_saida = id_imovel;
    this.ctrl_solicitar = true;
  }

  solicitarCancelar(){
    this.ctrl_solicitar = false;
  }

  solicitarConfirmar(){
    this.http.post(this.global.endereco+'solicitar-saida.php', this.id_solicitar_saida)
      .subscribe(data=> {
        this.ctrl_solicitar = false;
        window.alert('Entraremos em contato para dar continuação a solicitação de saida do inquilino');
    });

  };

  assinarProprietario(id_imovel){
    console.log('assinar funcionou');
    this.router.navigate(['/usuario/assinarproprietario', id_imovel]);
  }
}
