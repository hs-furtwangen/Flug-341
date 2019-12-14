import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnleitungPage } from './anleitung.page';

const routes: Routes = [
  {
    path: '',
    component: AnleitungPage
  },
  {
    path: ':ingame',
    component: AnleitungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnleitungPageRoutingModule {}
