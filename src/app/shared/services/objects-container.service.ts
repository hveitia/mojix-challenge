import { Injectable } from '@angular/core';
import {Movie} from '../../home/models/movie';

@Injectable({
  providedIn: 'root'
})
export class ObjectsContainerService {

  private movie: Movie;
  private isConnected = true;
  private activeLanguage = 'en';
  constructor() { }
  getMovie(){
    return this.movie;
  }
  setMovie(movie: Movie){
    this.movie = movie;
  }

  getIsConnected(){
    return this.isConnected;
  }
  setIsConnected(isConnected: boolean){
    this.isConnected = isConnected;
  }

  getActiveLanguage(){
    return this.activeLanguage;
  }
  setActiveLanguage(languaje: string){
    this.activeLanguage = languaje;
  }
}
