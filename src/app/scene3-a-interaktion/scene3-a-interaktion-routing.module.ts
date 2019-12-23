import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Scene3AInteraktionPage } from './scene3-a-interaktion.page';

const routes: Routes = [
  {
    path: '',
    component: Scene3AInteraktionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Scene3AInteraktionPageRoutingModule {}
