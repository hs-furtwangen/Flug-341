import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'anleitung',
    loadChildren: () => import('./anleitung/anleitung.module').then( m => m.AnleitungPageModule)
  },
  {
    path: 'szene1-der-absturz',
    loadChildren: () => import('./szene1-der-absturz/szene1-der-absturz.module').then( m => m.Szene1DerAbsturzPageModule)
  },
  {
    path: 'szene2-erwachen',
    loadChildren: () => import('./szene2-erwachen/szene2-erwachen.module').then( m => m.Szene2ErwachenPageModule)
  },
  {
    path: 'szene3-a-im-fluss',
    loadChildren: () => import('./szene3-a-im-fluss/szene3-a-im-fluss.module').then( m => m.Szene3AImFlussPageModule)
  },
  {
    path: 'szene3-b-wasserfall',
    loadChildren: () => import('./szene3-b-wasserfall/szene3-b-wasserfall.module').then( m => m.Szene3BWasserfallPageModule)
  },
  {
    path: 'szene4-der-baum',
    loadChildren: () => import('./szene4-der-baum/szene4-der-baum.module').then( m => m.Szene4DerBaumPageModule)
  },
  {
    path: 'szene5-ende',
    loadChildren: () => import('./szene5-ende/szene5-ende.module').then( m => m.Szene5EndePageModule)
  },  {
    path: 'credits',
    loadChildren: () => import('./credits/credits.module').then( m => m.CreditsPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
