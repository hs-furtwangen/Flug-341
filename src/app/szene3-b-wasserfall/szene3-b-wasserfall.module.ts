import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3BWasserfallPageRoutingModule } from './szene3-b-wasserfall-routing.module';

import { Szene3BWasserfallPage } from './szene3-b-wasserfall.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene3BWasserfallPageRoutingModule
  ],
  declarations: [Szene3BWasserfallPage]
})
export class Szene3BWasserfallPageModule {}
