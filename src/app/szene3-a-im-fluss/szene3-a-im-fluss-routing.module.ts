import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene3AImFlussPage } from './szene3-a-im-fluss.page';

const routes: Routes = [
  {
    path: '',
    component: Szene3AImFlussPage
  },
  {
    path: ':frominteraktion',
    component: Szene3AImFlussPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene3AImFlussPageRoutingModule {}
