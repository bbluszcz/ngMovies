import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// components
import { HomeComponent } from './core/home/home.component';
import { FavActorsComponent } from './fav-actors/fav-actors.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', loadChildren: './movies/movies.module#MoviesModule'},
  { path: 'favourite-actors', component: FavActorsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '**', component: HomeComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
