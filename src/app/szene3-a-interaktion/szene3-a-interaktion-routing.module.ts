import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene3AInteraktionPage } from './szene3-a-interaktion.page';

const routes: Routes = [
  {
    path: '',
    component: Szene3AInteraktionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene3AInteraktionPageRoutingModule {}
