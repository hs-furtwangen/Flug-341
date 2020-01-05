import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Szene5EndePage } from './szene5-ende.page';

const routes: Routes = [
  {
    path: '',
    component: Szene5EndePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Szene5EndePageRoutingModule {}
