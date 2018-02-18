import { Actor } from '../shared/actor.model';
import { Subject } from 'rxjs/Subject';

export class FavActorsService {
  favActorsChanged = new Subject<Actor[]>();
  startedEditing = new Subject<number>();
  private favActors: Actor[] = [
    new Actor('Francis', 'McDermott'),
    new Actor('Johny', 'Depp'),
    new Actor('Brad', 'Pitt'),
    new Actor('Monica', 'Belucci'),
  ];

  getFavActors() {
    return this.favActors.slice();
  }

  getFavActor(index: number) {
    return this.favActors[index];
  }

  addActor(actor: Actor) {
    this.favActors.push(actor);
    this.favActorsChanged.next(this.favActors.slice());
  }

  addFavActors(actor: Actor) {
    this.favActors.push(actor);
    this.favActorsChanged.next(this.favActors.slice());
  }

  updateActor(index: number, newActor: Actor) {
    this.favActors[index] = newActor;
    this.favActorsChanged.next(this.favActors.slice());
  }

  deleteActor(index: number) {
    this.favActors.splice(index, 1);
    this.favActorsChanged.next(this.favActors.slice());
  }
}
