import { Pipe, PipeTransform, Input } from '@angular/core';

@Pipe({
    name: 'DropdownFilter'
})

export class DropdownFilterPipe implements PipeTransform {
    transform(value: any[], filter: string): any[] {
        return filter ? value.filter(
            (arraySearched: any[]) =>
        this.selectedFilter(arraySearched, filter))
         : value;
    }


    selectedFilter(arraySearched, filter) {
        if (filter === 'All') {
            return arraySearched;
        } else {
            return (arraySearched['genres'].indexOf(filter) !== -1);
        }
    }


}
