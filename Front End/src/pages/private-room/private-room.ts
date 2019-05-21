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
  messages = [];
  message: string;
  id_ami: any;
  pseudo_ami: any;
  pseudo: any;


constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {
  this.pseudo_ami=navParams.get('pseudo_ami');
  this.id_ami=navParams.get('id_ami');
  this.pseudo=navParams.get('pseudo');


    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      
    });
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
    return observable;
  }

  sendMessage() {
    this.socket.emit('private-message', { text: this.message, id_dest: this.id_ami, pseudo: this.pseudo_ami });
    this.message = '';
  }

}
