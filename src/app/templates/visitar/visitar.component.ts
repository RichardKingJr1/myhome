import {  ChangeDetectionStrategy, ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../siblings/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-visitar',
  templateUrl: './visitar.component.html',
  styleUrls: ['./visitar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush// add this (permite ver atualizações assincronas por demanda)
})
export class VisitarComponent implements OnInit {

  public dia = new Date();
  public semana = new Date();
  public dia_dom: Array<number> = [];
  public mes_dom: Array<number> = [];
  public ano_dom: Array<number> = [];
  public semana_pros: Array<number> = [];

  /*variaveis do dom*/
  public enviar_hora;  

  public enviar_dia;  
  public enviar_mes;
  public enviar_ano;
  public enviar_dia_numero;


 public ctrl_template: boolean = false;
  
  public horarios_original: any = [10, 11, 12, 13, 14, 15, 16, 17];
  public horarios: any = [];
  public horarios_final: any = [];

  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private http: HttpClient, private global: GlobalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //console.log(this.activatedRoute.snapshot.params.id);

    /*calcula quais serao os proximos 6 dias do mes e passa para o dom*/
    for (let n = 0; n < 6; n++) {
      this.dia.setDate(this.dia.getDate()+1);
      this.dia_dom[n] = this.dia.getDate();
      this.mes_dom[n] = this.dia.getMonth() + 1;
      this.ano_dom[n] = this.dia.getFullYear();
      this.semana_pros[n] = this.dia.getDay(); 
    };

    //seleciona o primeiro dia para checar horarios e salva os dados do primeiro dia para envio
    this.enviar_dia = this.dia_dom[0];
    this.enviar_mes = this.mes_dom[0];
    this.enviar_ano = this.ano_dom[0];

    this.enviar_dia_numero = this.dia_dom[0] + this.mes_dom[0] * 100 + this.ano_dom[0] * 10000;

    //busca no banco de dados os horarios ocupados e ritira da disponibilidade
    this.http.post(this.global.endereco+'buscar-agendamento.php', this.enviar_dia_numero)
    .subscribe(data=> {
      this.horarios =  data;
      this.horarios_final = this.horarios_original;
      this.horarios.forEach(element => {
        console.log(element.hora);
        this.horarios_final = this.horarios_final.filter( val => val != element.hora);
      });
      
      this.cdr.detectChanges(); // *trigger change here*
    });

    /*console.log(this.dia_dom);
    console.log(this.semana_pros);*/

  };

  buscarDia(numero){
    //busca os horarios disponiveis do dia selecionado e salva os dados do dia selecionado para envio
    this.enviar_dia = this.dia_dom[numero];
    this.enviar_mes = this.mes_dom[numero];
    this.enviar_ano = this.ano_dom[numero];

    this.enviar_dia_numero = this.dia_dom[numero] + this.mes_dom[numero] * 100 + this.ano_dom[numero] * 10000;

    //console.log(this.enviar_dia);

    this.http.post(this.global.endereco+'buscar-agendamento.php', this.enviar_dia_numero)
    .subscribe(data=> {
      this.horarios =  data;
      this.horarios_final = this.horarios_original;
      this.horarios.forEach(element => {
        console.log(element.hora);
        this.horarios_final = this.horarios_final.filter(val => val != element.hora);
      });
      this.cdr.detectChanges(); // *trigger change here*
      console.log(this.horarios_final);
    });
  }

  buscarHora(hora){
    //salva a hora selecionada para envio
    this.enviar_hora = hora;
  }

  enviarVisita(nome, email, telefone){
    this.spinner.show();

    let dataObj = {
      nome: nome,
      email: email,
      telefone: telefone,
      id_imovel: this.activatedRoute.snapshot.params.id,
      dia: this.enviar_dia,
      mes: this.enviar_mes,
      ano: this.enviar_ano,
      hora: this.enviar_hora,
      dia_numero: this.enviar_dia_numero
    };

    console.log(dataObj);

    this.http.post(this.global.endereco+'agendamento.php', dataObj, {responseType: 'text'})
    .subscribe(data=> {
      this.spinner.hide();
      this.horarios =  data;
      console.log(this.horarios);

      this.ctrl_template = !this.ctrl_template;
      
      this.cdr.detectChanges();
      console.log(this.ctrl_template);
    });
  }
}
