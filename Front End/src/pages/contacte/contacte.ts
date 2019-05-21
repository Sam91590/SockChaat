import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { PrivateRoomPage } from '../private-room/private-room';

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
  nickname = '';
  users= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket) {
    this.getListUsers().subscribe(data => {
      this.users = data['membres'];
    });
   }

  ionViewDidLoad(){
    this.socket.emit('getListUsers');
  }

  ionViewDidLeave(){
    this.socket.emit('getListUsers');
  }

  goMsgPrive(id_dest:any, pseudo_dest:any){
    this.navCtrl.push(PrivateRoomPage, {pseudo:this.nickname, id_ami: id_dest,pseudo_ami: pseudo_dest});
    console.log(this.nickname,id_dest,pseudo_dest);
  }
  
  getListUsers() {
    let observable = new Observable(observer => {
      this.socket.on('userList', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
/*
ionViewDidLoad() {
    console.log('ionViewDidLoad ContactePage');
    this.socket.emit('getuser',{
    });
  }
choixuser:string;
  listuser:any = [];
  longueurlistuser;
  utilisateur:string;
  nickname:string;
  mynickname:string;
  test:any=[];
  k;

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
*/