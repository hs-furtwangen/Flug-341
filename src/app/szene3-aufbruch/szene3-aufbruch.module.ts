import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3AufbruchPageRoutingModule } from './szene3-aufbruch-routing.module';

import { Szene3AufbruchPage } from './szene3-aufbruch.page';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Szene3AufbruchPageRoutingModule
  ],
  declarations: [Szene3AufbruchPage]
})
export class Szene3AufbruchPageModule {}
