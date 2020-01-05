import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaumInteraktionComponent } from './baum-interaktion/baum-interaktion.component';
import { CompassComponent } from './compass/compass.component';
import { GegenstandComponent } from './gegenstand/gegenstand.component';
import { InteraktionComponent } from './interaktion/interaktion.component';
import { QteButtonComponent } from './qte-button/qte-button.component';
import { StaticInteractionComponent } from './static-interaction/static-interaction.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
      ],
    declarations: [
        BaumInteraktionComponent, 
        CompassComponent,
        GegenstandComponent,
        InteraktionComponent,
        QteButtonComponent,
        StaticInteractionComponent
    ],
    exports: [
        BaumInteraktionComponent, 
        CompassComponent,
        GegenstandComponent,
        InteraktionComponent,
        QteButtonComponent,
        StaticInteractionComponent
    ]
})
export class ComponentsModule{}