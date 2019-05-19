import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { PrivateRoomPage } from '../private-room/private-room';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  nickname = '';
  users = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket: Socket, private toastCtrl: ToastController){
    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
        console.log("1")
      } else {
        this.showToast('User joined: ' + user);
        console.log("2")
      }
    });
  }

  ionViewDidLoad() {
    console.log('getListUsers');
  }
  ionViewDidLeave() {
    console.log('getListUsers');
  }

  goMsgPrive(id_dest:any, pseudo_dest:any){
    this.navCtrl.push(PrivateRoomPage, {pseudo:this.nickname, id_ami: id_dest,pseudo_ami: pseudo_dest});
  }

getUsers() {
  let observable = new Observable(observer => {
    this.socket.on('users-changed', (data) => {
      observer.next(data);
    });
  });
  return observable;
}

ionViewWillLeave() {
  this.socket.disconnect();
}

showToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}
}



