import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { TestPage } from '../test/test';
import { ContactePage } from '../contacte/contacte';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  nickname='';
  mdp='';
  mail='';
  calcul;
  constructor(public navCtrl: NavController, private socket: Socket, public navParams : NavParams, private alertCtrl: AlertController) {
    this.calcul = this.navParams.get('calcul');
    this.nickname = this.navParams.get('nickname');

    this.socket.once('status-connexion', verif =>{
      let affichage;
      if(verif ['status']==true)
      {
        console.log("Connexion effectuer");
        affichage ={
          title:"Succès",
          message : "Vous venez de vous connecter",
          buttons: [
            {
              text:'OK',
              handler: () => {
                this.socket.connect();
                this.socket.emit('set-nickname', this.nickname);
                this.navCtrl.push('ChatPage', { nickname: this.nickname });
              }
            }
          ]
        };
      }else{ 
        affichage = {
          title:"Echec", 
          subTitle:"Mauvais mot de passe / Pseudo",
          buttons:[
            {
              text:'OK',
              handler: () => {
                location.reload();
            }
          }
            ]
        };
      }
      this.alertCtrl.create(affichage).present();
    });
   }

  rreload(){
    location.reload();
  }

  connexion(){
    this.socket.emit('connexion',{
      mail:this.mail,
      nickname:this.nickname,
      mdp: this.mdp
    });
  }

  reload(){
    location.reload();
  }

  inscription(){
    this.navCtrl.push(TestPage);
  }


  PageContact(){
    this.navCtrl.push(ContactePage);
  }


}
