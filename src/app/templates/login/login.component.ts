import { Component, OnInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/siblings/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document, private http: HttpClient, private global: GlobalService, private router: Router, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'assets/scripts/custom.js';
    this.renderer2.appendChild(this._document.body, s);
    
  }

  logar(email, senha){
    this.spinner.show();

    let dataObj = {
      email: email,
      senha: senha
      //imovel: this.activatedRoute.snapshot.params.id
    };

    this.http.post(this.global.endereco+'login.php',dataObj)
    .subscribe(data=> {
      this.spinner.hide();
      if(data == "erro"){
        window.alert('Email ou senha incorretos');
      }else{
        let id = data;
        this.global.logar(id['id_usuario'], email, senha);
        this.router.navigate([this.global.destino]);
      }
    });
  };

}
