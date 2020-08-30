import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {API_URL} from '../../../data/constants';
import {Movie} from '../../models/movie';
import {HttpClient} from '@angular/common/http';
import {DbService} from '../../../shared/services/db.service';
import {orderByDate} from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class GetPopularMoviesService {

  behaviorSubject$;
  behaviorSubjectObservable$: Observable<Movie[]>;
  movies: [];

  constructor(private httpClient: HttpClient, private dbService: DbService ) {
    this.behaviorSubject$ = new BehaviorSubject(this.movies);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();
    this.loadPopularMovies();
  }

  // Get popular movies fro API
  loadPopularMovies(){
    const url = `${API_URL}popular`;
    this.httpClient.get(url).subscribe((response: any) => {
      const partialResult = response.results.map(item => new Movie(
          item.id,
          item.poster_path,
          item.title,
          item.vote_average,
          item.overview,
          item.release_date,
          item.backdrop_path
      ));
      const result = orderByDate(partialResult).slice(0, 10);
      if (result && result.length > 0){
        this.dbService.getAllMovies().then(data => {
          this.dbService.deleteAll().then(res => {
            this.saveData(result);
          });
        });
      }
      this.behaviorSubject$.next(result);
    }, e => {
    });
  }

  // Save data to local database
  saveData(movies: Movie[]){
    movies.forEach(item => this.dbService.addMovie(item));
  }

}
