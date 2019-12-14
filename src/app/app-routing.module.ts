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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
