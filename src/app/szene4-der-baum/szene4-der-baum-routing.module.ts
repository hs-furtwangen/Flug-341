import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene4DerBaumPage } from './szene4-der-baum.page';

const routes: Routes = [
  {
    path: '',
    component: Szene4DerBaumPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene4DerBaumPageRoutingModule {}
