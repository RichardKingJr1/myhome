import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-propostas',
  templateUrl: './propostas.component.html',
  styleUrls: ['./propostas.component.css']
})
export class PropostasComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private router: Router) { }

  public respostas;

  public resposta_cancela;

  public id_contrato: number;

  public ctrl_contrato:boolean = false;

  ngOnInit(): void {

    this.http.post(this.global.endereco+'buscar-propostas.php', this.global.id_usuario)
      .subscribe(data=> {
        this.respostas = data;   
    });

  }

  cancelar(id_contrato){
    this.id_contrato = id_contrato;
    this.ctrl_contrato = true;
  }

  cancelar_cancelar(){
    this.ctrl_contrato = false;
  }

  cancelar_confirmar(){
    this.http.post(this.global.endereco+'cancela-proposta.php', this.id_contrato)
      .subscribe(data=> {
        this.resposta_cancela = data; 
        window.alert('Proposta cancelada com sucesso'); 
        this.ctrl_contrato = false; 
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/usuario/propostas']);
        });
    });
  }

  assinar(id_alugar){
    console.log('assinar funcionou');
    this.router.navigate(['/usuario/assinarusuario', id_alugar]);
  }

  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }
}
