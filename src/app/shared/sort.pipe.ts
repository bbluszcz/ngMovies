import { Pipe, PipeTransform, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { MovieService } from '../movies/movie.service';

import { Actor } from './actor.model';
import { Movie } from '../movies/movie.model';
import { forEach } from '@angular/router/src/utils/collection';


@Pipe({
  name: 'Sort'
})

export class SortPipe implements PipeTransform {

  sortBy: number;
  // private subscription: Subscription;

  constructor(private movieService: MovieService) {
    this.movieService.getSortBy().subscribe(
      id => this.sortBy = id
    );
  }

  transform(value: any[], filter: string): any[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.sort((a: any, b: any) => {
      if (this.sortBy === 3) {
        if (a['title'] > b['title']) {
          return -1;
        } else if (a['title'] < b['title'])  {
          return 1;
        } else {
          return 0;
        }
    } else if (this.sortBy === 2) {
        if (a['title'] < b['title']) {
          return -1;
        } else if (a['title'] > b['title'])  {
          return 1;
        } else {
          return 0;
        }
      } else if (this.sortBy === 1) {
        if (a['year'] < b['year']) {
          return -1;
        } else if (a['year'] > b['year']) {
          return 1;
        } else {
          return 0;
        }
      } else  {
        if (a['year'] > b['year']) {
          return -1;
        } else if (a['year'] < b['year']) {
          return 1;
        } else {
          return 0;
        }
      }
    }) : value;
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}


