import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
// models
import { Movie } from '../movie.model';
import { Actor } from '../../shared/actor.model';
// services
import { MovieService } from './../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  @ViewChild('searchType') select: ElementRef;
  searchType= 0;  // setting the searchType to All 
  movies: Movie[];
  subscription: Subscription;

      constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.movieService.moviesChanged
      .subscribe(
        (movies: Movie[]) => {
          this.movies = movies;
        }
      );
    this.movies = this.movieService.getMovies();
    console.log(this.movies[0]['actors'][0]['surname']);

    // searchbar


  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }


  onChange() {
    this.searchType = this.select.nativeElement.options.selectedIndex;
    this.movieService.sendSearchType(this.searchType);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
