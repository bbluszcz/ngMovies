import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// components
import { HomeComponent } from './core/home/home.component';
import { FavActorsComponent } from './fav-actors/fav-actors.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', loadChildren: './movies/movies.module#MoviesModule'},
  { path: 'favourite-actors', component: FavActorsComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
