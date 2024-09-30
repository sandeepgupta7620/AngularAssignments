import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MoviesData } from '../../constants/movie.constants';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Filters } from '../../interfaces/Filters';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  genres: string[] = [];
  directors: string[] = [];
  selectedGenres: string[] = [];
  selectedDirectors: string[] = [];
  searchQuery: string = '';

  isGenreDropdownOpen = false;
  isDirectorDropdownOpen = false;

  @Output() filterChanged = new EventEmitter<Filters>();

  ngOnInit() {
    this.genres = this.getUniqueGenres();
    this.directors = this.getUniqueDirectors();
  }

  getUniqueGenres(): string[] {
    const allGenres = MoviesData.flatMap(movie => movie.Genre.split(',').map(genre => genre.trim()));
    return Array.from(new Set(allGenres));
  }

  getUniqueDirectors(): string[] {
    const allDirectors = MoviesData.map(movie => movie.Director);
    return Array.from(new Set(allDirectors));
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.emitFilterChange();
  }

  onGenreChange(genre: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
    this.emitFilterChange();
  }

  onDirectorChange(director: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedDirectors.push(director);
    } else {
      this.selectedDirectors = this.selectedDirectors.filter(d => d !== director);
    }
    this.emitFilterChange();
  }

  emitFilterChange() {
    this.filterChanged.emit({
      genres: this.selectedGenres,
      directors: this.selectedDirectors,
      searchQuery: this.searchQuery
    });
  }

  toggleGenreDropdown() {
    this.isGenreDropdownOpen = !this.isGenreDropdownOpen; 
  }

  toggleDirectorDropdown() {
    this.isDirectorDropdownOpen = !this.isDirectorDropdownOpen; 
  }
}
