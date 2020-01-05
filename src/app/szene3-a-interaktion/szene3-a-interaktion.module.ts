import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3AInteraktionPageRoutingModule } from './szene3-a-interaktion-routing.module';

import { Szene3AInteraktionPage } from './szene3-a-interaktion.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Szene3AInteraktionPageRoutingModule
  ],
  declarations: [Szene3AInteraktionPage]
})
export class Szene3AInteraktionPageModule {}
