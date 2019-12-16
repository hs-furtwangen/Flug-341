import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene2ErwachenPageRoutingModule } from './szene2-erwachen-routing.module';

import { Szene2ErwachenPage } from './szene2-erwachen.page';

//Custom Components 
import { GegenstandComponent } from '../components/gegenstand/gegenstand.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene2ErwachenPageRoutingModule
  ],
  declarations: [Szene2ErwachenPage, GegenstandComponent]
})
export class Szene2ErwachenPageModule {}
