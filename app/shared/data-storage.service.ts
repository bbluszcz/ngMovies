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
  currentEmail: string;
  currentUser;
  constructor(private http: Http,
              private movieService: MovieService,
              private favActorsService: FavActorsService,
              private authService: AuthService) {
  }

  storeMovies() {
    const token = this.authService.getToken();
    this.getCurrentUser();
    return this.http.put('https://ng-movie-base.firebaseio.com/' +
      this.currentUser + '/movie_base.json?auth=' + token, this.movieService.getMovies())
  }

  storeFavActors() {
    const token = this.authService.getToken();
    this.getCurrentUser();
    return this.http.put('https://ng-movie-base.firebaseio.com/' +
      this.currentUser + '/fav_actors_base.json?auth=' + token, this.favActorsService.getFavActors());
  }

  getMovies() {
    const token = this.authService.getToken();
    this.getCurrentUser();
    this.http.get('https://ng-movie-base.firebaseio.com/' +
      this.currentUser + '/movie_base.json?auth=' + token)
      .map(
        (response: Response) => {
          const movies: Movie[] = response.json();
          for (const movie of movies) {
            if (!movie['actors']) {
              movie['actors'] = [];
            }
          }
        //     } else if (!movie['genres']) {
        //     movie['genres'] = [];
        //     } else if (!movie['plot']) {
        //     movie['plot'] = '';
        //     } else if (!movie['imagePath']) {
        //       movie['imagePath'] = '';
        //   }
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
    this.getCurrentUser();
    this.http.get('https://ng-movie-base.firebaseio.com/' +
      this.currentUser + '/fav_actors_base.json?auth=' + token)
      .map(
        (response: Response) => {
          const favActors: Actor[] = response.json();
          return favActors;
        }
      )
      .subscribe(
        (favActors: Actor[]) => {
          this.favActorsService.setFavActors(favActors);
        }
      );
  }


  getCurrentUser() {
    this.currentUser = this.authService.currentUser;
    this.currentEmail = this.authService.currentEmail;
  }
}
