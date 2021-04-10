import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/siblings/global.service';

@Component({
  selector: 'app-atualizar-fotos',
  templateUrl: './atualizar-fotos.component.html',
  styleUrls: ['./atualizar-fotos.component.css']
})
export class AtualizarFotosComponent implements OnInit {

  constructor(private http: HttpClient, private global: GlobalService, private router: Router, private ng2ImgMax: Ng2ImgMaxService, private activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  //variaveis para maneajr fotos
  public urls = [];
  public imgs = [];
  public img_excluidas = [];

  //variaveis do template
  public garagem;
  public moradores;
  public janela_desocupacao;
  public taxa_desocupacao;

  public resposta: any;

  //this.activatedRoute.snapshot.params.id

  ngOnInit(): void {
    let controle = 0;

    this.http.post(this.global.endereco+'buscar-imovel-unidade.php', JSON.stringify(this.activatedRoute.snapshot.params.id))
      .subscribe(data=> {
        this.resposta = data;   
        this.garagem = this.resposta.tipo_garagem;
        this.moradores = this.resposta.tipo_morador;
        this.janela_desocupacao = this.resposta.janela_desocupacao;
        this.taxa_desocupacao = this.resposta.taxa_desocupacao;
    });

    //coloca as fotos atuais em exposição
    while(controle < this.activatedRoute.snapshot.params.numero){
      //console.log(this.global.endreco_foto+'imoveis/'+this.activatedRoute.snapshot.params.id+'_'+controle+'.jpg');
      let obj = {
        url: this.global.endreco_foto+'imoveis/'+this.activatedRoute.snapshot.params.id+'_'+controle+'.jpg',
        index: controle
      };
      this.urls.push(obj);
      controle = controle + 1;
    }
    
  }

  //carrega as novas fotos
  selectFiles(event){
    if(event.target.files) {
      for(var i = 0; i < event.target.files.length; i++){
        if(this.imgs.length < 30){
          var reader = new FileReader();

          let image = event.target.files[i];

          //teste se é um arquivo png
          if(image.type == "image/png" || image.type == "image/jpg" || image.type == "image/jpeg"){
            //aplica resize na imagem
            this.ng2ImgMax.resizeImage(image, 900, 10000).subscribe(
              result => {
                image = result;

                //aplica compressão na imagem, limitando 50kb
                this.ng2ImgMax.compressImage(image, 0.050).subscribe(
                  result => {
                    this.imgs.push(result);
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

            //apresenta preview da imagem
            reader.readAsDataURL(event.target.files[i]);

            reader.onload = (event:any) => {

              let obj = {
                url:event.target.result,
                index: -1
              }
              this.urls.push(obj);
            }
          }else{
            window.alert("São aceitas apenas imagens no formato PNG, a imagem "+(i+1)+" enviada não foi aceita");
          };
          
        }else{
          i = event.target.files.length;
          window.alert('Numero maximo de 30 fotos exedido');
        }
      }
    }
  }

  //exclui as fotos
  excluir1(posicao_img, index){
    //testa se a foto a ser excluida é nova ou antiga, se for antiga coloca no array avisando exclusão se for nova apenas retita do array de fotos a serem upadas
    if(index >= 0){
      console.log(posicao_img);
      this.urls.splice(posicao_img, 1);
      this.img_excluidas.push(index);
      console.log(this.img_excluidas);
    }else{
      console.log(posicao_img);
      this.urls.splice(posicao_img, 1);
      this.imgs.splice(posicao_img, 1);
    }
  }
 
  deslogar(){
    this.router.navigate(['/']);
    this.global.deslogar();
  }

  //finaliza atualização
  atualizar(sgarantia, fiador, caucao, numero_moradores, moradores_preco, garagem_inclusa, garagem_a_parte, garagem_preco, aluguel, condominio, iptu, mes_janela, valor_taxa){

    this.spinner.show();

    const dataObj = new FormData();

    dataObj.append('aluguel', aluguel);
    dataObj.append('condominio', condominio);
    dataObj.append('iptu', iptu);
    dataObj.append('sgarantia', sgarantia);
    dataObj.append('fiador', fiador);
    dataObj.append('caucao', caucao);
    dataObj.append('tipo_garagem', this.garagem);
    if(this.garagem == 1){
      dataObj.append('n_vagas', garagem_inclusa);
    }else if( this.garagem == 0){
      dataObj.append('n_vagas', '0');
    }else {
      dataObj.append('n_vagas', garagem_a_parte);
    };
    dataObj.append('preco_vaga', garagem_preco);
    dataObj.append('tipo_morador', JSON.stringify(this.moradores));
    dataObj.append('preco_morador', moradores_preco);
    dataObj.append('n_morador', numero_moradores);
    dataObj.append('janela_desocupacao', this.janela_desocupacao);
    dataObj.append('mes_janela', mes_janela);
    dataObj.append('taxa_desocupacao', this.taxa_desocupacao);
    dataObj.append('valor_taxa', valor_taxa);

    for(var i = 0; i < this.imgs.length; i++){
    
      let name: string = 'fp'+i;

      dataObj.append(name, this.imgs[i], this.imgs[i].name);
    
    };

    let antigas = parseInt(this.activatedRoute.snapshot.params.numero) - this.img_excluidas.length;

    dataObj.append('tamanho_excluidas',antigas.toString());
    dataObj.append('tamanho_antigas', this.activatedRoute.snapshot.params.numero);
    dataObj.append('tamanho_novas', this.imgs.length.toString());
    dataObj.append('imgs_excluidas', JSON.stringify(Object.assign({}, this.img_excluidas)));
    dataObj.append('id_imovel', this.activatedRoute.snapshot.params.id);
    //console.log(dataObj);

    this.http.post(this.global.endereco+'atualizar-foto.php', dataObj, {responseType: "text"}).subscribe(data=> { 
      console.log(data);
      if(data == "ok"){
        window.alert('Seu imovel foi atualizado'); 
        this.spinner.hide();  
      }else{
        window.alert('Ocorreu um erro durante a atualização');  
        this.spinner.hide();        
      };
      this.router.navigateByUrl('/usuario/minhaspropriedades'); 
    });


     
  }

}
