import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {API_URL} from '../../../data/constants';
import {Movie} from '../../models/movie';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPopularMoviesService {

  private behaviorSubject$;
  behaviorSubjectObservable$: Observable<Movie[]>;
  movies: [];

  constructor(private httpClient: HttpClient   ) {
    this.behaviorSubject$ = new BehaviorSubject(this.movies);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();
    this.initPopularMovies();
  }

  initPopularMovies(){

    const url = `${API_URL}popular`;

    this.httpClient.get(url).subscribe((response: any) => {
      this.behaviorSubject$.next(response.results.map(item => new Movie(
          item.id,
          item.poster_path,
          item.title,
          item.vote_average,
          item.overview,
          item.release_date,
          item.backdrop_path
          )));
    }, e => {
    });
  }
}
