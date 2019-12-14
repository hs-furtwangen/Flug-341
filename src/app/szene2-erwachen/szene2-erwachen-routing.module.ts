import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene2ErwachenPage } from './szene2-erwachen.page';

const routes: Routes = [
  {
    path: '',
    component: Szene2ErwachenPage
  },
  {
    path: ':fromInstruction',
    component: Szene2ErwachenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene2ErwachenPageRoutingModule {}
