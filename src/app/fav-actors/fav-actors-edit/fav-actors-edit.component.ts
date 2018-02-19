import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Actor } from '../../shared/actor.model';
import { FavActorsService } from '../fav-actors.service';

@Component({
  selector: 'app-fav-actors-edit',
  templateUrl: './fav-actors-edit.component.html',
})
export class FavActorsEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') favActorsForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Actor;

  constructor(private favActorsService: FavActorsService) { }

  ngOnInit() {
    this.subscription = this.favActorsService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.favActorsService.getFavActor(index);
          this.favActorsForm.setValue({
            name: this.editedItem.name
                    })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newActor = new Actor(value.name, value.surname, value.second_name );
    if (this.editMode) {
      this.favActorsService.updateActor(this.editedItemIndex, newActor);
    } else {
      this.favActorsService.addActor(newActor);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.favActorsForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.favActorsService.deleteActor(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
