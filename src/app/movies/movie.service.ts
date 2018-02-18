import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// TS models
import { Actor } from './../shared/actor.model';
import { Movie } from './movie.model';
import { Genre } from '../shared/genre.model';
// services
import { FavActorsService } from '../fav-actors/fav-actors.service';

@Injectable()
export class MovieService {
  moviesChanged = new Subject<Movie[]>();
  favActors: Actor[];

  searchType = new Subject<number>();
  id: number;

  private movies: Movie[] = [
    new Movie(
      0,
      'Pulp Fiction',
      'Quentin Tarantino',
      ['Drama', 'Crime'],
      1994,
      // tslint:disable-next-line:max-line-length
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      'http://1.fwcdn.pl/po/10/39/1039/7517880.3.jpg',
      [
        new Actor('John', 'Travolta'),
        new Actor('Samuel', 'Jackson', 'L.'),
        new Actor('Uma', 'Thurman'),
        new Actor('Bruce', 'Willis'),
        new Actor('Tim', 'Roth')
      ]),
    new Movie(
      1,
      'Django Unchained',
      'Quentin Tarantino',
      [ 'Western', 'Drama'],
      2012,
      // tslint:disable-next-line:max-line-length
      "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
      'https://eplakaty.pl/img/towary/1/2016_10/Django-unchained-life-liberty-and-the-pursuit-of-vengeance-plakat.jpg',
      [
        new Actor('Jamie', 'Foxx'),
        new Actor('Christoph', 'Waltz'),
        new Actor('Samuel', 'Jackson', 'L.'),
        new Actor('Leonardo', 'DiCaprio'),
        new Actor('Kerry', 'Washington')
      ]),
    new Movie(
      2,
      'Inglorious Bastards',
      'Quentin Tarantino',
      ['Adventure', 'War', 'Drama'],
      2009,
      // tslint:disable-next-line:max-line-length
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
      'http://1.fwcdn.pl/po/77/47/137747/7276639.3.jpg',
      [
        new Actor('Brad', 'Pitt'),
        new Actor('Christoph', 'Waltz'),
        new Actor('Eli', 'Roth'),
        new Actor('Michael', 'Fassbender')
      ]),
    new Movie(
      3,
      'The Godfather',
      'Francis Ford Coppola',
      ['Drama', 'Crime'],
      1972,
      // tslint:disable-next-line:max-line-length
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      'https://img.etsystatic.com/il/7af35b/1210293390/il_fullxfull.1210293390_5w3z.jpg',
      [
        new Actor('Marlon', 'Brando'),
        new Actor('Al', 'Pacino'),
        new Actor('Robert', 'Duvali'),
        new Actor('Diane', 'Keaton')
      ]),
    new Movie(
      4,
      'The Silence of the Lambs',
      'Jonathan Demme',
      ['Drama', 'Thriller'],
      1991,
      // tslint:disable-next-line:max-line-length
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
      'https://screenwritingfromiowa.files.wordpress.com/2010/06/silenceofthelambs.jpg',
      [
        new Actor('Anthony', 'Hopkins'),
        new Actor('Lawrence', 'Bonny', 'A.'),
        new Actor('Jodie', 'Foster')
      ]),
    new Movie(
      5,
      'Fight Club',
      'David Fincher',
      ['Drama'],
      1999,
      // tslint:disable-next-line:max-line-length
      "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soapmaker, forming an underground fight club that evolves into something much, much more.",
      'https://www.movieposter.com/posters/archive/main/67/MPW-33738',
      [
        new Actor('Brad', 'Pitt'),
        new Actor('Edward', 'Norton'),
        new Actor('Meat', 'Loaf'),
        new Actor('Zach', 'Grenier')
      ]),
    new Movie(
      6,
      'The Shawshank Redemption',
      'Frank Darabont',
      ['Crime', 'Drama'],
      1995,
      // tslint:disable-next-line:max-line-length
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
      [
        new Actor('Tim', 'Robins'),
        new Actor('Morgan', 'Freeman'),
        new Actor('Bob', 'Gunton'),
      ]),
    new Movie(
      7,
      'Inception',
      'Christopher Nolan',
      ['Action', 'Sci-Fi'],
      2010,
      // tslint:disable-next-line:max-line-length
      "A thief, who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
      'http://i.imgur.com/K1kvJw1.jpg',
      [
        new Actor('Leonardo', 'DiCaprio'),
        new Actor('Joseph', ' Gordon-Levitt'),
        new Actor('Tom', 'Hardy'),
      ]),
  ];

  constructor(private favActorsService: FavActorsService) {}

  setMovies(movies: Movie[]) {
    this.movies = movies;
    this.moviesChanged.next(this.movies.slice());
  }

  getMovies() {
    return this.movies.slice();
  }

  getMovie(index: number) {
    return this.movies[index];
  }

  addFavActorsToNewTab(actor: Actor) {
  // check if actor already exists
    this.favActors = this.favActorsService.getFavActors();
     if (this.favActors.indexOf(actor) === -1) {
       this.favActorsService.addFavActors(actor);
     }
    // for (const i of this.favActors) {this.favActorsService.getFavActor()}

  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
  }

  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies.slice());
  }

  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    this.moviesChanged.next(this.movies.slice());
  }

// search box - pipes methods
  sendSearchType(id: number) {
    this.searchType.next(id);
  }

  getSearchType(): Observable<number> {
    return this.searchType.asObservable();
  }
}
