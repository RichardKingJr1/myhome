import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/siblings/global.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-alugar',
  templateUrl: './alugar.component.html',
  styleUrls: ['./alugar.component.css']
})
export class AlugarComponent implements OnInit {

  /*resposta da função de aluguel*/
  public resposta;
  public id_usuario;

  /*variavel de controle de data*/
  public entrada;

  /*dados do usuario*/
  public usuario;

  /*dado do imovel sendo alugado*/
  public imovel

  /*variavel ngModel para controlar o tipo de garantia selecionada*/
  public garantia;

  /*contro de html de confirmaçãp*/
  public controle_view: boolean = true;

  /* variaveis para receber imagens de comprovante de renda */
  public imgs = [];
  public urls = [];

  public img = [];
  public img_url = [];

  /*resposta da função de busca de desconto*/
  public desconto_resposta = 0;
  public afiliado_resposta = 0;

  /*variaveis para manipular as variaveis da data de entrada*/
  public dateTime = new Date();

  public dateVariavel = new Date();

  public dia: number;
  public mes: number;
  public ano: number;

  public dataMinima: string;
  public dataMaxima: string;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private global: GlobalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //estabelece os dias de entrada e de saida disponiveis para serem escolhidos
    this.dateVariavel.setDate(this.dateTime.getDate() + 7);
    this.dia = this.dateVariavel.getDate();
    this.mes = this.dateVariavel.getMonth() + 1;
    this.ano = this.dateVariavel.getFullYear();

    this.dataMinima = String(this.ano)+"-"+("0"+String(this.mes)).slice(-2)+"-"+("0"+String(this.dia)).slice(-2);

    this.dateVariavel.setDate(this.dateTime.getDate() + 30);
    this.dia = this.dateVariavel.getDate();
    this.mes = this.dateVariavel.getMonth() + 1;
    this.ano = this.dateVariavel.getFullYear();

    this.dataMaxima = String(this.ano)+"-"+("0"+String(this.mes)).slice(-2)+"-"+("0"+String(this.dia)).slice(-2);

    this.http.post(this.global.endereco+'dados-usuario.php', this.global.id_usuario)
    .subscribe(data=> {
      this.usuario = data;  
      console.log(this.usuario);
    });

    this.http.post(this.global.endereco+'buscar-imovel-unidade.php', this.global.imovel)
    .subscribe(data=> {
      this.imovel = data;  
      console.log(this.imovel);
    });

  }

  mudarDesconto(cupom){
    console.log(cupom);

    this.http.post(this.global.endereco+'desconto.php', cupom)
    .subscribe(data=> {
      this.desconto_resposta = data['desconto'];
      this.afiliado_resposta = data['id_afiliado'];
      console.log(this.desconto_resposta);
      if(this.desconto_resposta == undefined){
        window.alert('Desconto não encontrado');
      }else{
        window.alert('Desconto de '+this.desconto_resposta+'%');
      }
    });
  };

  alugar(garantia, numero_vagas, numero_moradores, email_fiador, data_entrada){
    if(this.global.id_usuario == this.imovel.id_usuario){
      window.alert("Você não pode alugar seu próprio imovel");
    }else if(email_fiador == localStorage.getItem('email')){
      window.alert("Você não pode colocar sua propria conta como fiador");
    }else{
      console.log(data_entrada); 
      this.spinner.show();

      if(garantia == 1){
        this.http.post(this.global.endereco+'buscar-usuario.php', email_fiador)
        .subscribe(data=> {
          this.id_usuario = data;

          if(this.id_usuario){
            this.alugar_continuar(garantia, numero_vagas, numero_moradores, data_entrada);
          }else{
            this.spinner.hide();
            window.alert("Email do fiador inválido");
          }
        });
      }else{
        this.alugar_continuar(garantia, numero_vagas, numero_moradores, data_entrada);
      }
    }
  };

  selectFiles(event){
    if(event.target.files) {
      for(var i = 0; i < event.target.files.length; i++){
        if(this.imgs.length < 3){
          var reader = new FileReader();

          // console.log(event.target.files[i]);
          this.imgs.push(event.target.files[i]);
          reader.readAsDataURL(event.target.files[i]);

          reader.onload = (event:any) => {
            this.urls.push(event.target.result);
          }
        }else{
          i = event.target.files.length;
          window.alert('Numero maximo de 3 fotos exedido');
        }
      }
      console.log(this.imgs);
    }
  }

  selectFiles_1(event, n){
    if(event.target.files) {
      var reader = new FileReader();

      this.img[n] = event.target.files[0];//a imagem esta armazenada aqui
      
      //o endereço temporario da imagem é salvo aqui para podermos ver a imagem q acabou de ser upada
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event:any) => {
        this.img_url[n] = event.target.result;
      }
    }
  }

  excluir(n){
    this.img[n] = null;
    this.img_url[n] = null;
  }
  
  excluir1(posicao_img){
    console.log(posicao_img);
    this.urls.splice(posicao_img, 1);
    this.imgs.splice(posicao_img, 1);
  }
  /******processamento interno******/
  alugar_continuar(garantia, numero_vagas, numero_moradores, data_entrada){
    //cria objeto com os dados e envia para o backend
    const dataObj = new FormData();

    for(var i = 0; i < this.imgs.length; i++){
        
      let name: string = 'ft'+i;

      dataObj.append(name, this.imgs[i], this.imgs[i].name);
    
    };

    dataObj.append('id_usuario', this.global.id_usuario.toString());
    dataObj.append('imovel', this.global.imoveis);
    dataObj.append('tamanho', JSON.stringify(this.imgs.length));
    dataObj.append('desconto', this.desconto_resposta.toString());
    dataObj.append('garantia', garantia.toString());
    dataObj.append('afiliado', this.afiliado_resposta.toString());
    dataObj.append('vagas_atv', numero_vagas.toString());
    dataObj.append('moradores_atv', numero_moradores.toString());
    dataObj.append('data_entrada', data_entrada);

    if(garantia == 1){
      dataObj.append('fiador', this.id_usuario.id_usuario.toString());
      dataObj.append('ft_certidao', this.img[0], this.img[0].name);
      dataObj.append('ft_certidao_', this.img[1], this.img[1].name);
    };
    
    this.http.post(this.global.endereco+'alugar.php', dataObj)
    .subscribe(data=> {
      this.spinner.hide();
      this.resposta = data;
      this.controle_view = !this.controle_view;
    });
  }
}
