import { AuthService } from "./../../auth/auth.service";
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
  @ViewChild('searchType') selectSearchType: ElementRef;
  @ViewChild('sortBy') selectSortBy: ElementRef;
  searchType= 0;  // setting the searchType to 'All'
  sortBy = 0;   // setting the sortBy to 'year-desc'
  movies: Movie[];
  genres: any[];
  subscription: Subscription;
  listFilter: string;
  ddListFilter = '';
  sortByFilter = '';

      constructor(private movieService: MovieService,
        private authService: AuthService,
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
    this.genres = this.movieService.getGenres();
    this.ddListFilter = 'All';
    this.sortByFilter = 'year-asc'
  }

  onClearSearch() {
    this.listFilter = '';
  }

  onNewMovie() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onChangeDropdown() {
    this.searchType = this.selectSearchType.nativeElement.options.selectedIndex;
    this.movieService.sendSearchType(this.searchType);
    this.onClearSearch();
  }

  onChangeSort() {
    this.sortBy = this.selectSortBy.nativeElement.options.selectedIndex;
    this.movieService.sendSortBy(this.sortBy);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
