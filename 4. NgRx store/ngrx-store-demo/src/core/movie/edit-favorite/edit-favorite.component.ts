import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectFavorites } from '../+store/movie.selectors';
import { Movie } from '../+store/movie';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { updateFavorite } from '../+store/movie.actions';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-edit-favorite',
  templateUrl: './edit-favorite.component.html',
  styleUrls: ['./edit-favorite.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EditFavoriteComponent implements OnInit {
  form!: FormGroup;

  movieToEdit$!: Observable<Movie | undefined>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      Title: ['', Validators.required],
      Year: ['']
    });

    this.movieToEdit$ = this.route.paramMap.pipe(
      switchMap(params => {
        const imdbID = params.get('imdbID');
        return this.store.select(selectFavorites).pipe(
          map(favorites => favorites.find(m => m.imdbID === imdbID))
        );
      }),
      tap(movie => {
        if (movie) {
          this.form.patchValue({
            Title: movie.Title,
            Year: movie.Year
          });
        }
      })
    );
  }

  onSave() {
    if (this.form.invalid) return;

    const changes: Partial<Movie> = {};
    for (const [key, control] of Object.entries(this.form.controls)) {
      if (control.dirty) {
        (changes as any)[key] = control.value;
      }
    }

    if (Object.keys(changes).length > 0) {
      const imdbID = this.route.snapshot.paramMap.get('imdbID')!;
      this.store.dispatch(
        updateFavorite({
          imdbID,
          changes
        })
      );
    }
  }
}
