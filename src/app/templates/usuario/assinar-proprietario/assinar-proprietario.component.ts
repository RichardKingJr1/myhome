/******************** Não sendo utilizado *********************** */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
declare const d4sign: any;

@Component({
  selector: 'app-assinar-proprietario',
  templateUrl: './assinar-proprietario.component.html',
  styleUrls: ['./assinar-proprietario.component.css']
})
export class AssinarProprietarioComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient, private global: GlobalService) { }

  public respostas;
  public sucesso = false;

  ngOnInit(): void {
    this.http.post(this.global.endereco+'buscar-contrato-imovel.php', this.activatedRoute.snapshot.params.id)
      .subscribe(data=> {
        this.respostas = data; 
        let parent = this;
        d4sign.configure({
            container: "signature-div1",
            key: this.respostas.id_d4,
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

}
