import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3AufbruchPageRoutingModule } from './szene3-aufbruch-routing.module';

import { Szene3AufbruchPage } from './szene3-aufbruch.page';

import { InteraktionComponent } from '../components/interaktion/interaktion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene3AufbruchPageRoutingModule
  ],
  declarations: [Szene3AufbruchPage, InteraktionComponent]
})
export class Szene3AufbruchPageModule {}
