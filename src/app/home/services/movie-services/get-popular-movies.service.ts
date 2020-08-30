import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {API_URL} from '../../../data/constants';
import {Movie} from '../../models/movie';
import {HttpClient} from '@angular/common/http';
import {DbService} from '../../../shared/services/db.service';

@Injectable({
  providedIn: 'root'
})
export class GetPopularMoviesService {

  private behaviorSubject$;
  behaviorSubjectObservable$: Observable<Movie[]>;
  movies: [];

  constructor(private httpClient: HttpClient, private dbService: DbService ) {
    this.behaviorSubject$ = new BehaviorSubject(this.movies);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();
    this.loadPopularMovies();
  }

  loadPopularMovies(){
    const url = `${API_URL}popular`;
    this.httpClient.get(url).subscribe((response: any) => {
      const result = response.results.map(item => new Movie(
          item.id,
          item.poster_path,
          item.title,
          item.vote_average,
          item.overview,
          item.release_date,
          item.backdrop_path
      ));
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

  saveData(movies: Movie[]){
    movies.forEach(item => this.dbService.addMovie(item));
  }


}
