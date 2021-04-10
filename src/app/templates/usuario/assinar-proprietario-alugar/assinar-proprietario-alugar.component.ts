import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare const d4sign: any;

@Component({
  selector: 'app-assinar-proprietario-alugar',
  templateUrl: './assinar-proprietario-alugar.component.html',
  styleUrls: ['./assinar-proprietario-alugar.component.css']
})
export class AssinarProprietarioAlugarComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private global: GlobalService, private spinner: NgxSpinnerService) { }

  public respostas;
  public result;
  public assinatura;
  public sucesso = false;

  public endereco = this.global.endereco;

  ngOnInit(): void {
    this.http.post(this.global.endereco+'buscar-contrato-aluguel-proprietario.php', this.activatedRoute.snapshot.params.id)
    .subscribe(data=> {
        this.respostas = data;   

        switch(true){
          case (this.respostas.imobiliaria_k == 0):
            this.respostas.imobiliaria_k = 1;
            this.assinar2(this.respostas.contrato_imobiliaria);
            break;
          case (this.respostas.locacao_k1 == 0):
            this.respostas.locacao_k1 = 1;
            this.assinar2(this.respostas.contrato_locacao);
            break;
          default:
            window.alert("Todos os contratos ja foram assinados. Esperando assinatura das outras partes");
        };
        /*
        let parent = this;
        d4sign.configure({
            container: "signature-div",
            key: this.chave,
            protocol: "https",
            host: "secure.d4sign.com.br/embed/viewblob",
            signer: {
                email: this.respostas.email,
            },
            width: '80%',
            height: '800',
            callback: function(event) {
              if (event.data === "signed") {
                window.alert('Contrato Assinado');
                parent.assinar2();
                return;
              };
            }
        });*/
    });  
  }

  assinar2(chave){

    let parent = this; //permite acesso dos metodos desse objeto no metodo filho 
    d4sign.configure({
      container: "signature-div2",
      key: chave,
      protocol: "https",
      host: "secure.d4sign.com.br/embed/viewblob",
      signer: {
          email: this.respostas.email,
      },
      width: '80%',
      height: '800',
      callback: function(event) {

        if (event.data === "signed") {
          
          switch(true){
            case (parent.respostas.imobiliaria_k == 0):
              parent.respostas.imobiliaria_k = 1;
              parent.assinar2(parent.respostas.contrato_imobiliaria);
              break;
            case (parent.respostas.locacao_k1 == 0):
              parent.respostas.locacao_k1 = 1;
              parent.assinar2(parent.respostas.contrato_locacao);
              break;
            default:
              console.log("http funcionando");
              parent.sucesso = true;
              return;
          };
        };
      }
    });

    /*console.log("Teste Verificar");

    this.http.post(this.endereco+'verificar-assinado.php', this.activatedRoute.snapshot.params.id)
    .subscribe(data=> {
      console.log("Teste Funcionou");
      this.result = data;
      if(this.result.locacao_k1 == '1' && this.result.imobiliaria_k == '1'){
        console.log("http funcionando");
        this.sucesso = true;
        return;
      };
    });*/
  }

  cancelar_contrato(){
    this.spinner.show();

    let dataObj = {
      id_alugar: this.activatedRoute.snapshot.params.id,
      contrato_locacao: this.respostas.contrato_locacao,
      contrato_imobiliaria: this.respostas.contrato_imobiliaria,
      email_proprietario: localStorage.getItem('email'),
      email_solicitante: this.respostas.solicitante
    };

    this.http.post(this.global.endereco+'d4sign/cancelar-contrato-aluguel-proprietario.php', dataObj)
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
