import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EnCarteleraResponse, Movie } from '../interfaces/EnCartelera-response';

import { map, catchError } from 'rxjs/operators';
import { CreditsResponse } from '../interfaces/credits-response';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  getCartelera(): Observable<EnCarteleraResponse>{
    return this.http.get<EnCarteleraResponse>('https://api.themoviedb.org/3/movie/now_playing?api_key=312298214585daddc7809ce4f07f7bdd&language=es-Es&page=1');
  }

  searchMovies(query: string){
    
    let consulta = query.replace(' ', '%20');

    return this.http.get<EnCarteleraResponse>(`https://api.themoviedb.org/3/search/movie?api_key=312298214585daddc7809ce4f07f7bdd&language=es-ES&query=${consulta}&page=1&include_adult=true`)
    .pipe(map(resp => resp.results));
  }

  getMovie(id: number){
    return this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=312298214585daddc7809ce4f07f7bdd&language=es-ES`).
    pipe(
      catchError(err => of(null))
    );
  }

  getCast(id: number){
    return this.http.get<CreditsResponse>(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=312298214585daddc7809ce4f07f7bdd`)
    .pipe(
      map(resp => resp.cast ),
      catchError(err => of([]))
    );
  }
}
