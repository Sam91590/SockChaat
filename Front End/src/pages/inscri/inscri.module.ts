import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscriPage } from './inscri';

@NgModule({
  declarations: [
    InscriPage,
  ],
  imports: [
    IonicPageModule.forChild(InscriPage),
  ],
})
export class InscriPageModule {}
