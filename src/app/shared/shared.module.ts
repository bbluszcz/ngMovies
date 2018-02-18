import { InputFilterPipe } from "./input-filter.pipe";
import { DropdownFilterPipe } from "./dropdown-filter.pipe";
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// directives
import { DropdownDirective } from './dropdown.directive';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    FilterPipe,
    DropdownFilterPipe,
    InputFilterPipe
  ],
  imports: [FormsModule],
  exports: [
    CommonModule,
    DropdownDirective,
    FilterPipe,
     DropdownFilterPipe,
    InputFilterPipe
  ],
})
export class SharedModule {}
