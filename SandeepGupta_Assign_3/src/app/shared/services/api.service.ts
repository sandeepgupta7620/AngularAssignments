import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ROUTES_URL } from '../constant/routes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private http = inject(HttpClient); alternate way
  moviesBasePath = environment.moviePath;
  postBasePath = environment.postPath;


  constructor(private http: HttpClient) {  }


  getMovies(){
    try {
     return this.http.get(this.moviesBasePath + ROUTES_URL.getMovie);
    } catch (error) {
      throw new Error();
    }
  }

  getPosts(){
    try {
      return this.http.get(this.postBasePath + ROUTES_URL.getPost);
    } catch (error) {
      throw new Error();
    }
  }

  
}
