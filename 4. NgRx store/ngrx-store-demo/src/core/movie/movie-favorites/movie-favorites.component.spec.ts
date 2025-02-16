import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavoritesComponent } from './movie-favorites.component';

describe('MovieFavoritesComponent', () => {
  let component: MovieFavoritesComponent;
  let fixture: ComponentFixture<MovieFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
