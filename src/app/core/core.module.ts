import { NgModule } from '@angular/core';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

// my modules
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
// components
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
// services
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { MovieService } from '../movies/movie.service';
import { FavActorsService } from '../fav-actors/fav-actors.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    Angular2FontawesomeModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    MovieService,
    FavActorsService,
    DataStorageService,
    AuthService
  ]
})
export class CoreModule {}
