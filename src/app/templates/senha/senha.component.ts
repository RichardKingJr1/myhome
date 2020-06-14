import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/siblings/global.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-senha',
  templateUrl: './senha.component.html',
  styleUrls: ['./senha.component.css']
})
export class SenhaComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private spinner: NgxSpinnerService) { }

  public ctrl_template: boolean = true;

  public resposta;

  ngOnInit(): void {
  }

  senha(email){
    this.spinner.show();
    this.http.post(this.global.endereco+'recuperar-senha.php', email , {responseType: "text"})
    .subscribe(data=> {
      this.spinner.hide();
      this.resposta = data;
      if(data == "0"){
        this.ctrl_template = !this.ctrl_template;
      }else{
        window.alert('Email não cadastrado');
      };
    });
  }
}
