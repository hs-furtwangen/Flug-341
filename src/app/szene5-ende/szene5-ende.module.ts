import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene5EndePageRoutingModule } from './szene5-ende-routing.module';

import { Szene5EndePage } from './szene5-ende.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    Szene5EndePageRoutingModule,
  ],
  declarations: [Szene5EndePage]
})
export class Szene5EndePageModule {}
