import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ContactePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacte',
  templateUrl: 'contacte.html',
})
export class ContactePage {
  choixuser:string;
  listuser:any = [];
  longueurlistuser;
  utilisateur:string;
  nickname:string;
  mynickname:string;
  test:any=[];
  k;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.mynickname=navParams.get('mynickname');
    this.socket.once('status-getuser', verif =>{
      let affichage;
      if(verif ['status']==true)
      {
        this.listuser=verif['sql'];
        
        this.longueurlistuser=this.listuser.length;
        this.longueurlistuser=this.longueurlistuser-1;


      for(let i = 0; i <= this.longueurlistuser; i++){
        this.test[i]=this.listuser[i].nickname;
        }


      for(let j = 0; j<= this.longueurlistuser; j++){
        if(this.test[j]==this.mynickname){
          this.test[j]="";
          }
        }
      }
    });
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactePage');
    this.socket.emit('getuser',{
    });
  }

  PagePrive(id_dest:any, pseudo_dest:any){
    if(this.choixuser!==undefined){
      this.k = this.choixuser;
    console.log(this.k);
    this.utilisateur=this.test[this.k];
    console.log(this.utilisateur);
    this.socket.connect();
    this.socket.emit('set-nickname', this.mynickname);
    this.navCtrl.push('PrivateRoomPage', {mynickname:this.mynickname, nickname:this.utilisateur});
    }
  }

  Test(){
  }



}
