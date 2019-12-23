import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Scene3AInteraktionPageRoutingModule } from './scene3-a-interaktion-routing.module';

import { Scene3AInteraktionPage } from './scene3-a-interaktion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Scene3AInteraktionPageRoutingModule
  ],
  declarations: [Scene3AInteraktionPage]
})
export class Scene3AInteraktionPageModule {}
