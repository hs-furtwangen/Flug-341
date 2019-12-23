import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene4DerBaumPageRoutingModule } from './szene4-der-baum-routing.module';

import { Szene4DerBaumPage } from './szene4-der-baum.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene4DerBaumPageRoutingModule
  ],
  declarations: [Szene4DerBaumPage]
})
export class Szene4DerBaumPageModule {}
