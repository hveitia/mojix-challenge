import { Injectable } from '@angular/core';
import {Movie} from '../../home/models/movie';

@Injectable({
  providedIn: 'root'
})
export class ObjectsContainerService {

  private movie: Movie;
  constructor() { }
  getMovie(){
    return this.movie;
  }
  setMovie(movie: Movie){
    this.movie = movie;
  }
}
