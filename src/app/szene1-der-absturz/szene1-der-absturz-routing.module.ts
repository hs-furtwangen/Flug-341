import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene1DerAbsturzPage } from './szene1-der-absturz.page';

const routes: Routes = [
  {
    path: '',
    component: Szene1DerAbsturzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene1DerAbsturzPageRoutingModule {}
