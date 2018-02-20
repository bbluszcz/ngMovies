import { InputFilterPipe } from "./input-filter.pipe";
import { DropdownFilterPipe } from "./dropdown-filter.pipe";
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// directives
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownFilterPipe,
    InputFilterPipe
  ],
  imports: [FormsModule],
  exports: [
    CommonModule,
    DropdownDirective,
    DropdownFilterPipe,
    InputFilterPipe
  ],
})
export class SharedModule {}
