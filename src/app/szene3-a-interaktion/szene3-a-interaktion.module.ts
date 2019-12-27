import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3AInteraktionPageRoutingModule } from './szene3-a-interaktion-routing.module';

import { Szene3AInteraktionPage } from './szene3-a-interaktion.page';
import { CompassComponent} from '../components/compass/compass.component';
import { QteButtonComponent } from '../components/qte-button/qte-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene3AInteraktionPageRoutingModule
  ],
  declarations: [Szene3AInteraktionPage, CompassComponent, QteButtonComponent]
})
export class Szene3AInteraktionPageModule {}
