import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// directives
import { DropdownDirective } from './dropdown.directive';
import { InputFilterPipe } from "./input-filter.pipe";
import { SortPipe } from "./sort.pipe";
import { DropdownFilterPipe } from "./dropdown-filter.pipe";

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownFilterPipe,
    InputFilterPipe,
    SortPipe
  ],
  imports: [FormsModule],
  exports: [
    CommonModule,
    DropdownDirective,
    DropdownFilterPipe,
    InputFilterPipe,
    SortPipe
  ],
})
export class SharedModule {}
