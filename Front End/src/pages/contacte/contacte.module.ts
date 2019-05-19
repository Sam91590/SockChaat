import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactePage } from './contacte';

@NgModule({
  declarations: [
    ContactePage,
  ],
  imports: [
    IonicPageModule.forChild(ContactePage),
  ],
})
export class ContactePageModule {}
