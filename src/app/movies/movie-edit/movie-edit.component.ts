import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
  }

  onAddActor() {
    (<FormArray>this.movieForm.get('actors')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'role': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteActor(index: number) {
    (<FormArray>this.movieForm.get('actorss')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.movieForm.get('actors')).controls;
  }

  private initForm() {
    let movieTitle = '';
    let movieImagePath = '';
    let movieDescription = '';
    const movieActors = new FormArray([]);

    if (this.editMode) {
      const movie = this.movieService.getMovie(this.id);
      movieTitle = movie.title;
      movieImagePath = movie.imagePath;
      movieDescription = movie.plot;
      if (movie['actors']) {
        for (const actor of movie.actors) {
          movieActors.push(
            new FormGroup({
              'name': new FormControl(actor.name, Validators.required),
              'surname': new FormControl(actor.surname, Validators.required
              //   [
              //   Validators.required,
              //   Validators.pattern(/^[1-9]+[0-9]*$/)
              // ]
            )
            })
          );
        }
      }
    }

    this.movieForm = new FormGroup({
      'title': new FormControl(movieTitle, Validators.required),
      'imagePath': new FormControl(movieImagePath, Validators.required),
      'description': new FormControl(movieDescription, Validators.required),
      'actors': movieActors
    });
  }

}
