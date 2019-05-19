
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { ContactPage } from '../contact/contact';
import { ContactePage } from '../contacte/contacte';
 
@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})

export class ChatPage {
  messages = [];
  message = '';
  nickname = '';
  mynickname='';

constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) {

    this.mynickname=navParams.get('nickname');
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
        this.nickname == user;
      } else {
        this.showToast('User joined: ' + user);
        this.nickname == user;
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
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
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  PageContact(){
    this.socket.connect();
    this.socket.emit('sett-nickname', this.nickname);
    this.navCtrl.push('ContactePage', { mynickname: this.mynickname });

  }
}