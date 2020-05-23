import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  public controle_view: boolean = false;

  public img = [];
  public img_url = [];

  constructor(private http: HttpClient, private global: GlobalService, private spinner: NgxSpinnerService, private ng2ImgMax: Ng2ImgMaxService) { }

  ngOnInit(): void {
  }

  criar(email, senha, csenha, nome, snome, rg, cpf, tel, profissao, nacionalidade, estado_civil, cep, endereco, complemento, banco, agencia, conta){

    switch (true) {
      case (!email):
        window.alert('Preencha o email');
        break;
    
      case (!senha):
        window.alert('Preencha senha');
        break;

      case (!nome):
        window.alert('Preencha o nome');
        break;

      case (!snome):
        window.alert('Preencha o sobrenome');
        break;

      case (!rg):
        window.alert('Preencha o rg');
        break;

      case (!cpf):
        window.alert('Preencha o cpf');
        break;

      case (!tel):
        window.alert('Preencha o telefone');
        break;

      case (senha.length < 8):
        window.alert('Senha precisa de 8 digitos ou mais')
        break;

      case (senha != csenha) :
        window.alert('Senha e confirmação da senha estão diferentes');
        break;

      case (typeof this.img[0] === 'undefined' || this.img[0] == null):
        window.alert('Adicione a foto frontal do seu documento');
        break;

      case (typeof this.img[1] === 'undefined' || this.img[1] == null):
        window.alert('Adicione a foto da parte de traz do seu documento');
        break;

      case (typeof this.img[2] === 'undefined' || this.img[2] == null):
        window.alert('Adicione uma foto sua segurando seu documento');
        break;

      default:

        this.spinner.show();

        const dataObj = new FormData();

        dataObj.append('ft_0', this.img[0], this.img[0].name);
        dataObj.append('ft_1', this.img[1], this.img[1].name);
        dataObj.append('ft_2', this.img[2], this.img[2].name);
        dataObj.append('email', email);
        dataObj.append('senha', senha);
        dataObj.append('nome', nome);
        dataObj.append('snome', snome);
        dataObj.append('rg', rg);
        dataObj.append('cpf', cpf);
        dataObj.append('nacionalidade', nacionalidade);
        dataObj.append('profissao', profissao);
        dataObj.append('estado_civil', estado_civil); 
        dataObj.append('telefone', tel); 

        dataObj.append('cep', cep); 
        dataObj.append('endereco', endereco); 
        dataObj.append('complemento', complemento); 

        dataObj.append('banco', banco);
        dataObj.append('agencia', agencia);
        dataObj.append('conta', conta);
        
        this.http.post(this.global.endereco+'criar-conta.php', dataObj)
        .subscribe(data=> {
          this.spinner.hide();
          switch (data) {
            case '0':
              window.alert('Email já cadastrado');
              break;
            case '1':
              this.controle_view = !this.controle_view;
              break;
            default:
              window.alert('Ocorreu um erro, tente novamente mais tarde');
              break;
          };
          console.log(data);
        });
        break;
    }

    
  };

  selectFiles(event, n){
    if(event.target.files) {
      var reader = new FileReader();

      let image = event.target.files[0];

      //teste se é um arquivo png
      if(image.type == "image/png" || image.type == "image/jpg" || image.type == "image/jpeg"){
        //aplica resize na imagem
        this.ng2ImgMax.resizeImage(image, 900, 10000).subscribe(
          result => {
            image = result;

            //aplica compressão na imagem, limitando 50kb
            this.ng2ImgMax.compressImage(image, 0.050).subscribe(
              result => {
                this.img[n] = result
              },
              error => {
                console.log('😢 Oh no!', error);
              }
            );
          },
          error => {
            console.log('😢 Oh no!', error);
          }
        );

        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event:any) => {
          this.img_url[n] = event.target.result;
        }
      }else{
        window.alert("A imagem deve ter formato PNG");
      }
      
    }
  }

  excluir(n){
    this.img[n] = null;
    this.img_url[n] = null;
  }
}
