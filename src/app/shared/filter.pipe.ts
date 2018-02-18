import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from './actor.model';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    // tslint:disable-next-line:curly
    if (!items) return [];
    // tslint:disable-next-line:curly
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(

      (it => {
      return it.surname.toLowerCase().includes(searchText);
    })
  );
  }
}
