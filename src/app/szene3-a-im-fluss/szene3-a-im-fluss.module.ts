import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Szene3AImFlussPageRoutingModule } from './szene3-a-im-fluss-routing.module';

import { Szene3AImFlussPage } from './szene3-a-im-fluss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Szene3AImFlussPageRoutingModule
  ],
  declarations: [Szene3AImFlussPage]
})
export class Szene3AImFlussPageModule {}
