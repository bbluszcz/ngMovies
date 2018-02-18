// ng modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
// my modules
import { CoreModule } from './core/core.module';
import { FavActorsModule } from './fav-actors/fav-actors.module';
import { MoviesModule } from "./movies/movies.module";
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // my modules:
    CoreModule,
    FavActorsModule,
    MoviesModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
