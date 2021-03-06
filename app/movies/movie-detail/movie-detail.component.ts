import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { Actor } from '../../shared/actor.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  idOfActor: number;
  movie: Movie;
  idOfMovie: number;
  genres: string[];
  titleOfMovie: string;
  idsOfActors: number[] = [];
  namesOfActors: Actor[] = [];

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.idOfMovie = +params['id'];
          this.movie = this.movieService.getMovie(this.idOfMovie);
        }
      );
      this.genres = this.movieService.getGenres()
  }

   passIndex(index: number) {
     const check = this.idsOfActors.indexOf(index);
     if (check === -1) {
        this.idsOfActors.push(index);
      } else {
       this.idsOfActors.splice(check, 1);
      }

   }

  onAddFavActorsToNewTab(ids: number[] ) {
    for (const i of ids) {this.movieService.addFavActorsToNewTab(this.movie.actors[i]) };
    this.idsOfActors = [];

  }

  onEditMovie() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteMovie() {
    this.movieService.deleteMovie(this.idOfMovie);
    this.router.navigate(['/movies']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
