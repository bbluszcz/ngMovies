import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
// services
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  id: number;
  editMode = false;
  movieForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.movieService.updateMovie(this.id, this.movieForm.value);
    } else {
      this.movieService.addMovie(this.movieForm.value);
    }
    this.onCancel();
    console.log("this.movieForm  ", this.movieForm.value);

  }

  onAddActor() {
    (<FormArray>this.movieForm.get('actors')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'surname': new FormControl(null, Validators.required),
        'second_name': new FormControl(null),
      })
    );
  }

  onAddGenre() {
    (<FormArray>this.movieForm.get('genres')).push(
         new FormControl(null, Validators.required),
    );
  }

  onDeleteActor(index: number) {
    (<FormArray>this.movieForm.get('actors')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getActorsControls() {
    return (<FormArray>this.movieForm.get('actors')).controls;
  }

  getGenresControls() {
    return (<FormArray>this.movieForm.get('genres')).controls;
  }

  private initForm() {
    let movieIndex: number;
    let movieTitle = '';
    let movieDirector = '';
    let movieYear: number;
    let movieImagePath = '';
    let moviePlot = '';
    const movieActors = new FormArray([]);
    const movieGenres = new FormArray([]);

    if (this.editMode) {
      const movie = this.movieService.getMovie(this.id);
      movieIndex = movie.index;
      movieTitle = movie.title;
      movieImagePath = movie.imagePath;
      moviePlot = movie.plot;
      movieDirector = movie.director;
      movieYear = movie.year;

      if (movie['actors']) {
        for (const actor of movie.actors) {
          movieActors.push(
            new FormGroup({
              'name': new FormControl(actor.name, Validators.required),
              'surname': new FormControl(actor.surname, Validators.required),
              'second_name': new FormControl(actor.second_name)
            })
          );
        }
      }
      if (movie['genres']) {
        for (const genre of movie.genres) {
          movieGenres.push(
           new FormControl(genre),
            )
        }
      }
    }

        if (this.editMode) {
            this.movieForm = new FormGroup({
              'index': new FormControl(movieIndex),
              'title': new FormControl(movieTitle, Validators.required),
              'director': new FormControl(movieDirector, Validators.required),
              'year': new FormControl(movieYear, Validators.required),
              'genres': movieGenres,
              'imagePath': new FormControl(movieImagePath),
              'plot': new FormControl(moviePlot),
              'actors': movieActors
            });
        } else {
          this.movieForm = new FormGroup({
            'index': new FormControl(this.movieService.getMovies().length),
            'title': new FormControl(movieTitle, Validators.required),
            'director': new FormControl(movieDirector, Validators.required),
            'year': new FormControl(movieYear, Validators.required),
            'genres': movieGenres,
            'imagePath': new FormControl(movieImagePath),
            'plot': new FormControl(moviePlot),
            'actors': movieActors
          });

 console.log("this.movieForm  ", this.movieForm.value );
        }


  }
}
