import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FavActorsEditComponent } from './fav-actors-edit/fav-actors-edit.component';
import { FavActorsComponent } from './fav-actors.component';

@NgModule({
  declarations: [
    FavActorsComponent,
    FavActorsEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FavActorsModule {}
