import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene3BWasserfallPage } from './szene3-b-wasserfall.page';

const routes: Routes = [
  {
    path: '',
    component: Szene3BWasserfallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene3BWasserfallPageRoutingModule {}
