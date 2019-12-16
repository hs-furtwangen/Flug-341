import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene3AufbruchPage } from './szene3-aufbruch.page';

const routes: Routes = [
  {
    path: '',
    component: Szene3AufbruchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene3AufbruchPageRoutingModule {}
