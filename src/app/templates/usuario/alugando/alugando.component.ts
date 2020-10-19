import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-alugando',
  templateUrl: './alugando.component.html',
  styleUrls: ['./alugando.component.css']
})
export class AlugandoComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private router: Router) { }

  public respostas;

  public id_temp:number;

  public ctrl_desocupar: boolean = false;

  ngOnInit(): void {
    this.http.post(this.global.endereco+'buscar-alugueis.php', this.global.id_usuario)
      .subscribe(data=> {
        this.respostas = data;   
    });
  }

  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }

  boleto(id_imovel){

  }


  desocupar(id_imovel){
    this.id_temp = id_imovel;
    this.ctrl_desocupar = true;
  }

  desocuparConfirmar(){
    this.http.post(this.global.endereco+'desocupar.php', this.id_temp)
    .subscribe(data=> {
      window.alert('Entraremos em contato para dar prosseguimento a desocupação'); 
      this.ctrl_desocupar = false;
  });
  }

  desocuparCancelar(){
    this.ctrl_desocupar = false;
  }

}
