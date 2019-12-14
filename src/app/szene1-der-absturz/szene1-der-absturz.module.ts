import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene1DerAbsturzPageRoutingModule } from './szene1-der-absturz-routing.module';

import { Szene1DerAbsturzPage } from './szene1-der-absturz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene1DerAbsturzPageRoutingModule
  ],
  declarations: [Szene1DerAbsturzPage]
})
export class Szene1DerAbsturzPageModule {}
