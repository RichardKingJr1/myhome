import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare const d4sign: any;

@Component({
  selector: 'app-assinar-usuario',
  templateUrl: './assinar-usuario.component.html',
  styleUrls: ['./assinar-usuario.component.css']
})
export class AssinarUsuarioComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private global: GlobalService, private spinner: NgxSpinnerService) { }

  public respostas;
  public sucesso = false;

  ngOnInit(): void {
    this.http.post(this.global.endereco+'buscar-contrato-aluguel.php', this.activatedRoute.snapshot.params.id)
    .subscribe(data=> {
        this.respostas = data;  
        let parent = this; //permite acesso dos metodos desse objeto no metodo filho 
        d4sign.configure({
          container: "signature-div",
          key: this.respostas.contrato_locacao,
          protocol: "https",
          host: "secure.d4sign.com.br/embed/viewblob",
          signer: {
              email: this.respostas.email,
          },
          width: '80%',
          height: '800',
          callback: function(event) {
            if (event.data === "signed") {
              //window.alert('Contrato Assinado');
              //parent.router.navigate(['/']);
              parent.sucesso = true;
              return;
            };
          }
        });
    });  
  }

  cancelar_contrato(){
    this.spinner.show();
    let dataObj = {
      id_alugar: this.activatedRoute.snapshot.params.id,
      contrato_locacao: this.respostas.contrato_locacao,
      contrato_imobiliaria: this.respostas.contrato_imobiliaria,
      email_proprietario: this.respostas.proprietario,
      email_solicitante: localStorage.getItem('email')
    };

    this.http.post(this.global.endereco+'d4sign/cancelar-contrato-aluguel.php', dataObj)
    .subscribe(data=> {
      if(data == "ok"){
        this.spinner.hide();  
        window.alert('Contrato cancelado com sucesso');
        this.router.navigate(['/']);
      }else{
        this.spinner.hide();  
        window.alert('Ocorreu um erro, entre em contato por email ou telefone');
        this.router.navigate(['/']);
      };
    });  
  };
}

