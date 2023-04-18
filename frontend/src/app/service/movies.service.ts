import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  SERVER_URL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  //This is to fetch all the movies from the backend 
  getAllMovies() {
    return this.http.get<[]>(this.SERVER_URL + '/tvshows');
  }

  getMovieShowId(id: string) {
    return this.http.get<{}>(this.SERVER_URL + `/tvshows/${id}`);
  }
}
