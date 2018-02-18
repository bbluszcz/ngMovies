import { Pipe, PipeTransform, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { MovieService } from '../movies/movie.service';

import { Actor } from './actor.model';
import { Movie } from '../movies/movie.model';
import { forEach } from '@angular/router/src/utils/collection';


@Pipe({
  name: 'InputFilter'
})

export class InputFilterPipe implements PipeTransform, OnDestroy {

  searchType: number;
  private subscription: Subscription;

  constructor(private movieService: MovieService) {
    this.movieService.getSearchType().subscribe(
      id => this.searchType = id
    );
  }

  transform(value: any[], filter: string): any[] {
    filter = filter ? filter.toLocaleLowerCase() : null;
    return filter ? value.filter(
      (arraySearched) =>
        this.selectInputFilter(arraySearched, filter))
         : value;
  }

  selectInputFilter(arraySearched, filter) {
    if (this.searchType === 3) {
      const values = [];
      for (const actor of arraySearched['actors']) {
       values.push(actor['surname'].toLocaleLowerCase().indexOf(filter) !== -1);
        for (let i = 0; i < values.length; i++ ) {
          if (values[i] === true) {
            return (arraySearched['actors'][i]['surname'].toLocaleLowerCase().indexOf(filter) !== -1);
          }
        }
      }
  } else if (this.searchType === 2) {
      return (arraySearched['director'].toLocaleLowerCase().indexOf(filter) !== -1);
    } else if (this.searchType === 1) {
      return (arraySearched['title'].toLocaleLowerCase().indexOf(filter) !== -1);
    } else {
      return  (arraySearched['title'].toLocaleLowerCase().indexOf(filter) !== -1) ||
      (arraySearched['director'].toLocaleLowerCase().indexOf(filter) !== -1) ||
        (arraySearched['actors'][0]['surname'].toLocaleLowerCase().indexOf(filter) !== -1) ||
        (arraySearched['actors'][1]['surname'].toLocaleLowerCase().indexOf(filter) !== -1) || 
        (arraySearched['actors'][2]['surname'].toLocaleLowerCase().indexOf(filter) !== -1);
        // (arraySearched['actors'][3]['surname'].toLocaleLowerCase().indexOf(filter) !== -1);
  }
}

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}


