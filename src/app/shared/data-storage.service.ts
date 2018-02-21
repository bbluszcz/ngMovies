import { FavActorsService } from "./../fav-actors/fav-actors.service";
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { MovieService } from '../movies/movie.service';
import { Movie } from '../movies/movie.model';
import { Actor } from "./actor.model";
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private movieService: MovieService,
              private favActorsService: FavActorsService,
              private authService: AuthService) {
  }

  storeMovies() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-movie-base.firebaseio.com/movie_base.json?auth=' + token, this.movieService.getMovies());
  }

  storeFavActors() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-movie-base.firebaseio.com/fav_actors_base.json?auth=' + token, this.favActorsService.getFavActors());
  }

  getMovies() {
    const token = this.authService.getToken();
    this.http.get('https://ng-movie-base.firebaseio.com/movie_base.json?auth=' + token)
      .map(
        (response: Response) => {
          const movies: Movie[] = response.json();
          for (const movie of movies) {
            if (!movie['actors']) {
              movie['actors'] = [];
            }
          }
          return movies;
        }
      )
      .subscribe(
        (movies: Movie[]) => {
          this.movieService.setMovies(movies);
        }
      );
  }
  getFavActors() {
    const token = this.authService.getToken();
    this.http.get('https://ng-movie-base.firebaseio.com/fav_actors_base.json?auth=' + token)
      .map(
        (response: Response) => {
          const favActors: Actor[] = response.json();
          // for (const favActor of favActors) {
          //   if (!favActor['actors']) {
          //     favActor['actors'] = [];
          //   }
          // }
          return favActors;
        }
      )
      .subscribe(
        (favActors: Actor[]) => {
          this.favActorsService.setFavActors(favActors);
        }
      );
  }
}
