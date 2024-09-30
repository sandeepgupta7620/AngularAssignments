import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Movies } from '../../interfaces/Movies';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, JsonPipe } from '@angular/common';
import { MoviesData } from '../../constants/movie.constants';
import { FormsModule } from '@angular/forms';
import { Filters } from '../../interfaces/Filters';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatCardModule, CommonModule, JsonPipe, FormsModule],
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'] // Corrected to styleUrls
})
export class MovieComponent implements OnChanges {
  @Input() filters: Filters = { genres: [], directors: [], searchQuery: '' }; // Use Filters interface

  moviesData: Movies[] = MoviesData;
  filteredMovies: Movies[] = [];
  expandedImage: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filters']) {
      this.filterMovies();
    }
  }

  filterMovies() {
    this.filteredMovies = this.moviesData.filter(movie => {
      const matchesGenres = this.filters.genres.length === 0 || this.filters.genres.some(genre => movie.Genre.toLowerCase().includes(genre.toLowerCase()));
      const matchesDirectors = this.filters.directors.length === 0 || this.filters.directors.some(director => movie.Director.toLowerCase() === director.toLowerCase());
      const matchesSearchQuery = this.filters.searchQuery ? 
        movie.Title.toLowerCase().includes(this.filters.searchQuery.toLowerCase()) ||
        movie.Genre.toLowerCase().includes(this.filters.searchQuery.toLowerCase()) ||
        movie.Director.toLowerCase().includes(this.filters.searchQuery.toLowerCase()) ||
        movie.Plot.toLowerCase().includes(this.filters.searchQuery.toLowerCase()) : 
        true;
      
      return matchesGenres && matchesDirectors && matchesSearchQuery;
    });
  }


expandImage(imageUrl: string) {
  this.expandedImage = imageUrl;
}


closeImage() {
  this.expandedImage = null;
}

}
