import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Actor } from '../shared/actor.model';
import { FavActorsService } from './fav-actors.service';

@Component({
  selector: 'app-fav-actors-list',
  templateUrl: './fav-actors.component.html',
  styleUrls: ['./fav-actors.component.scss']
})
export class FavActorsComponent implements OnInit, OnDestroy {
  actors: Actor[];
  private subscription: Subscription;

  constructor(private favActorsService: FavActorsService) { }

  ngOnInit() {
    this.actors = this.favActorsService.getFavActors();
    this.subscription = this.favActorsService.favActorsChanged
      .subscribe(
        (actors: Actor[]) => {
          this.actors = actors;
        }
      );
  }

  onEditItem(index: number) {
    this.favActorsService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
