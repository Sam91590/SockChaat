import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
 
@IonicPage()
@Component({
  selector: 'page-private-room',
  templateUrl: 'private-room.html',
})
export class PrivateRoomPage {
  mynickname: string;
  nickname: string;
  messages = [];
  message: string;


constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
  this.mynickname=navParams.get('mynickname');
  this.nickname=navParams.get('nickname');

  this.getMessages().subscribe(message => {
    console.log(message);
    this.messages.push(message);
  });

  this.getUsers().subscribe(data => {
    let user = this.nickname;
    console.log(data['user']);
    if (data['event'] === 'left') {
      this.showToast('User left: ' + user);

    } else {
      this.showToast('User joined: ' + user);

    }
  });
}

sendMessage() {
  this.socket.emit('private-message', { text: this.message, id_dest: this.nickname, id:this.mynickname});
  console.log(this.message, this.nickname, this.mynickname);
  this.message = '';
}
getMessages() {
  let observable = new Observable(observer => {
    this.socket.on('Pmessage', (data) => {
      observer.next(data);
    });
  })

  return observable;
}
getUsers() {

  let observable = new Observable(observer => {
    this.socket.on('users-changed', (data) => {
      observer.next(data);
    });
  });
  console.log(observable);
  return observable;
}
showToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

}
