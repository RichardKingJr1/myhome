import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-mudar-senha',
  templateUrl: './mudar-senha.component.html',
  styleUrls: ['./mudar-senha.component.css']
})
export class MudarSenhaComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private router: Router) { }

  public resposta;

  ngOnInit(): void {
  }

  salvarSenha(senha_antiga, senha_nova, senha_confirmar){
    
    if(senha_nova == senha_confirmar){
      let dataObj = {
        id: this.global.id_usuario,
        senha_antiga: senha_antiga,
        senha_nova: senha_nova,
        senha_confirmar: senha_confirmar
      };

      this.http.post(this.global.endereco+'mudar-senha.php',dataObj)
      .subscribe(data=> {
        this.resposta = data;
        if(this.resposta == 0){
          window.alert('Senha errda');
        }else {
          window.alert('Senha Alterada Com Sucesso');
          this.router.navigate(['/usuario/dados']);
        } 
      });
    }else{
      window.alert('Senha nova diferente da confirmação');
    }
  };

  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }

}
