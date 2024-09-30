import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieComponent } from './pages/movie/movie.component';
import { SearchComponent } from './pages/search/search.component';
import { Filters } from './interfaces/Filters';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MovieComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SandeepGupta_Assign_1';
 

  filters: Filters = { genres: [], directors: [], searchQuery: '' };

  onFilterChange(newFilters: Filters) {
    this.filters = newFilters;
  }
}