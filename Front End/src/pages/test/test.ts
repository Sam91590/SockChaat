  import { Component } from '@angular/core';
  import { NavController, NavParams, AlertController } from 'ionic-angular';
  import { Socket } from 'ng-socket-io';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
   
  @Component({
    selector: 'page-test',
    templateUrl: 'test.html'
  })
  export class TestPage {
    nickname = '';
    mail:any='';
    mdp:any='';
    myForm:FormGroup;
   
    constructor(public navCtrl: NavController, private socket: Socket, public navParams : NavParams, private alertCtrl: AlertController, private formBuild: FormBuilder) {
      this.myForm = this.formBuild.group({
        mail:['', Validators.compose([Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      nickname:['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'),
      Validators.minLength(5), Validators.maxLength(30)])],
      mdp: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
  
  
      });
  
  
      this.socket.once('status-inscription', verif =>{
        let affichage;
        if(verif ['status']==true){
          console.log("Compte crée");
          affichage ={
            title:"Succès",
            message : "Le compte vient d'etre crée !",
            buttons: [
              {
                text:'OK',
                handler: () => {
                  this.navCtrl.goToRoot({});
                  this.socket.emit('set-nickname', this.nickname);
                  this.socket.emit('set-mdp', this.mdp);
                  this.socket.emit('set-email', this.mail);
                }
              }
            ]
          };
        }else{
          affichage = {
            title:"Echec",
            subTitle:"Le compte n'a pu être crée, car l'adresse email est déjà utilisée !",
            buttons:['OK']
          };
        }
        this.alertCtrl.create(affichage).present();
         
      });
     }
  
    inscription(){
      if(this.myForm.valid){
        this.socket.emit('inscription',{
          mail:this.mail,
          nickname:this.nickname,
          mdp:this.mdp
        });
      }else{
        this.alertCtrl.create({
          title:"Echec",
          subTitle:"Le compte n'a pu être crée, car vous avez mal saisi des champs!",
          buttons: ['OK']
        }).present();
      }
    }
  
    
  
  
  }