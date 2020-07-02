import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeoServiceService } from 'src/app/siblings/geo-service.service';
import { GlobalService } from 'src/app/siblings/global.service';
import { AddImovelService } from './service/add-imovel.service';

import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-add-imovel',
  templateUrl: './add-imovel.component.html',
  styleUrls: ['./add-imovel.component.css']
})
export class AddImovelComponent implements OnInit {

  constructor(private geoService: GeoServiceService, private _addImovelService: AddImovelService, private router: Router, private global: GlobalService, private http: HttpClient, private spinner: NgxSpinnerService, private ng2ImgMax: Ng2ImgMaxService) { }

  //variaveis para maneajr fotos
  public urls = [];
  public imgs = [];

  public fps = [];
  public img_fp = [];

  //variaveis para geocoding
  public latitude ;
  public longitude;
  public bairro;
  public cidade;
  public estado;
  public result;

  //variaveis de controle de opções/views
  public garagem;
  public moradores;
  public janela_desocpuacao;
  public taxa_desocpuacao;

  //variaveis globais publicas
  public logado_local = this.global.logado;
  
  ngOnInit(): void {
    console.log(this.logado_local);
  }

  
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
              this.urls.push(event.target.result);
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

 
  /*selectPlantas(event){
    if(event.target.files) {
      for(var x = 0; x < event.target.files.length; x++){
        if(this.img_fp.length < 3){
          var reader = new FileReader();

          //console.log(event.target.files[x]);
          this.img_fp.push(event.target.files[x]);
          reader.readAsDataURL(event.target.files[x]);

          reader.onload = (event:any) => {
            this.fps.push(event.target.result);
          }
        }else{
          x = event.target.files.length;
          window.alert('Numero maximo de 3 fotos da planta exedido');
        }
      }
      console.log(this.img_fp);
    }
  }*/

  excluir1(posicao_img){
    console.log(posicao_img);
    this.urls.splice(posicao_img, 1);
    this.imgs.splice(posicao_img, 1);
  }

  excluir2(posicao_img){
    console.log(posicao_img);
    this.fps.splice(posicao_img, 1);
    this.img_fp.splice(posicao_img, 1);
  }

  buscarCep(cep, endereco){
    if(cep && endereco){
      //realizar api
      //conecta com api para encontrar longitude e latitude do endereço 
      this.geoService
      .getLocation(endereco+' - '+cep)
      .subscribe(data=>{
        console.log(data);
        if(data.status != "ZERO_RESULTS"){
          (this.result = data.results[0].geometry.location);
          //console.log(data.results[0].geometry.location),
          (this.latitude = data.results[0].geometry.location.lat);
          (this.longitude = data.results[0].geometry.location.lng);
          this.bairro = data.results[0].address_components[1].long_name;
          this.cidade = data.results[0].address_components[2].long_name;
          this.estado = data.results[0].address_components[3].short_name;
        }else{
          window.alert("Endereço não encontrado, reveja o CEP e o nome da rua");
        }
      });
    }
  }


  adicionarImovel(aluguel, condominio, iptu, tipo, area, comodos, cep, endereco, numero, complemento, descricao, quartos, banheiros,  arcondicionado, banheira, chuveirogas, chuveiroeletrico, cortina, piscinaprivada, varanda, ventilador, academia, lazer, churrasqueira, elevador, lavanderia, piscina, portaria, salao, sauna, armariocozinha, armarioquarto, armariobanheiro, camacasal, camasolteiro, espelho, mesa, sofa, televisao, utensilio, fogao, geladeira, microondas, maquinalavar, pet, internet, agua, luz, gas, sgarantia, fiador, caucao, garagem_inclusa, garagem_a_parte, garagem_preco, moradores_preco, numero_moradores, mes_janela, valor_taxa){
    if(!cep || !endereco ){
      window.alert("Preencha o CEP e o Endereço para continuar");
    }else{

      this.spinner.show();
      this.geoService
        .getLocation(endereco+' - '+cep)
        .subscribe(data=>{
          (this.result = data.results[0].geometry.location);
          //console.log(data.results[0].geometry.location),
          (this.latitude = data.results[0].geometry.location.lat);
          (this.longitude = data.results[0].geometry.location.lng);
          this.bairro = data.results[0].address_components[1].long_name;
          this.cidade = data.results[0].address_components[2].long_name;
          this.estado = data.results[0].address_components[3].short_name;

          const dataObj = new FormData();

          for(var i = 0; i < this.imgs.length; i++){
          
            let name: string = 'fp'+i;

            dataObj.append(name, this.imgs[i], this.imgs[i].name);
          
          };

          for(var z = 0; z < this.img_fp.length; z++){
          
            let name: string = 'fn'+z;

            dataObj.append(name, this.img_fp[z], this.img_fp[z].name);
          
          };

          //remove caracteres de separação da string para depois converte-la em int
          let cep_int = cep;
          cep_int = cep_int.replace('-', '');
          cep_int = cep_int.replace('.', '');
          cep_int = cep_int.replace('-', '');

          //criar logica de preco 
          let preco: number =  parseInt(aluguel, 10);

          if(iptu){
            preco += parseInt(iptu);
          }

          if(condominio){
            preco += parseInt(condominio);
          }

          if(this.moradores == 1){
            preco = preco + parseInt(moradores_preco);
          };

          console.log(preco);

          dataObj.append('tamanho', this.imgs.length.toString());
          dataObj.append('tamanhofp', this.img_fp.length.toString());
          dataObj.append('latitude', this.latitude.toString());
          dataObj.append('longitude', this.longitude.toString());
          dataObj.append('alugar', '1');
          dataObj.append('tipo', tipo);
          dataObj.append('aluguel', aluguel);
          dataObj.append('condominio', condominio);
          dataObj.append('iptu', iptu);
          dataObj.append('preco', preco.toString());
          if(area){
            dataObj.append('area', area);
          }else{
            let area_temp = '0';
            dataObj.append('area', area_temp);
          }
          dataObj.append('comodos', comodos);
          dataObj.append('endereco', endereco);
          dataObj.append('bairro', this.bairro);
          dataObj.append('cidade', this.cidade);
          dataObj.append('estado', this.estado);
          dataObj.append('cep', cep_int);
          dataObj.append('numero', numero);
          dataObj.append('complemento', complemento);
          dataObj.append('descricao', descricao);
          dataObj.append('quartos', quartos);
          dataObj.append('banheiros', banheiros);
          dataObj.append('arcondicionado', arcondicionado);
          dataObj.append('banheira', banheira);
          dataObj.append('chuveirogas', chuveirogas);
          dataObj.append('chuveiroeletrico', chuveiroeletrico);
          dataObj.append('cortina', cortina);
          dataObj.append('piscinaprivada', piscinaprivada);
          dataObj.append('varanda', varanda);
          dataObj.append('ventilador', ventilador);
          dataObj.append('academia', academia);
          dataObj.append('lazer', lazer);
          dataObj.append('churrasqueira', churrasqueira);
          dataObj.append('elevador', elevador);
          dataObj.append('lavanderia', lavanderia);
          dataObj.append('piscina', piscina);
          dataObj.append('portaria', portaria);
          dataObj.append('salao', salao);
          dataObj.append('sauna', sauna);
          dataObj.append('armariocozinha', armariocozinha);
          dataObj.append('armarioquarto', armarioquarto);
          dataObj.append('armariobanheiro', armariobanheiro);
          dataObj.append('camacasal', camacasal);
          dataObj.append('camasolteiro', camasolteiro);
          dataObj.append('espelho', espelho);
          dataObj.append('mesa', mesa);
          dataObj.append('sofa', sofa);
          dataObj.append('televisao', televisao);
          dataObj.append('utensilio', utensilio);
          dataObj.append('fogao', fogao);
          dataObj.append('geladeira', geladeira);
          dataObj.append('microondas', microondas);
          dataObj.append('maquinalavar', maquinalavar);
          dataObj.append('internet', internet);
          dataObj.append('pet', pet);
          dataObj.append('agua', agua);
          dataObj.append('luz', luz);
          dataObj.append('gas', gas);
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
          dataObj.append('tipo_morador', this.moradores);
          dataObj.append('preco_morador', moradores_preco);
          dataObj.append('n_morador', numero_moradores);
          dataObj.append('janela_desocupacao', this.janela_desocpuacao);
          dataObj.append('mes_janela', mes_janela);
          dataObj.append('taxa_desocupacao', this.taxa_desocpuacao);
          dataObj.append('valor_taxa', valor_taxa);
          if(this.global.logado){
            dataObj.append('id_usuario', this.global.id_usuario.toString());
          };          

          //console.log(dataObj);


          this._addImovelService.adicionarImovel(dataObj)
          .subscribe(data=> { 
            console.log(data);
            if(data == "ok"){
              window.alert('Seu imovel foi cadastrado para análise, entraremos em contato através do email cadastrado.'); 
              this.spinner.hide();  
            }else{
              window.alert('Ocorreu um erro durante o cadastro tente novemente mais tarde');  
              this.spinner.hide();        
            };
            this.router.navigateByUrl('/inicio'); 
          });
      }); 
    };
  }
}
