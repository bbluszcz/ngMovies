import { Genre } from "./../shared/genre.model";
import { Actor } from './../shared/actor.model';

export class Movie {
  public index: number;
  public title: string;
  public director: string;
  public genre: string[];
  public year: number;
  public plot: string;
  public imagePath: string;
  public actors: Actor[];

  // tslint:disable-next-line:max-line-length
  constructor(index: number, title: string, director: string, genre: string[], year: number,   plot: string, imagePath: string, actors: Actor[]) {
    this.index = index;
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.year = year;
    this.plot = plot;
    this.imagePath = imagePath;
    this.actors = actors;
  }
}
