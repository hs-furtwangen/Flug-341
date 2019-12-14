import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnleitungPageRoutingModule } from './anleitung-routing.module';

import { AnleitungPage } from './anleitung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnleitungPageRoutingModule
  ],
  declarations: [AnleitungPage]
})
export class AnleitungPageModule {}
