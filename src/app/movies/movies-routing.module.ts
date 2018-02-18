import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// component
import { MoviesComponent } from './movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieStartComponent } from './movie-start/movie-start.component';
// service
import { AuthGuard } from '../auth/auth-guard.service';
// pipes

const moviesRoutes: Routes = [
  { path: '', component: MoviesComponent, children: [
    { path: '', component: MovieStartComponent },
    // { path: 'new', component: MovieEditComponent, canActivate: [AuthGuard] },
    { path: 'new', component: MovieEditComponent },
    { path: ':id', component: MovieDetailComponent },
    // { path: ':id/edit', component: MovieEditComponent, canActivate: [AuthGuard] },
    { path: ':id/edit', component: MovieEditComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class MoviesRoutingModule {}
