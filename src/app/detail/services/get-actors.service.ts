import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ObjectsContainerService} from '../../shared/services/objects-container.service';
import {API_URL} from '../../data/constants';
import {BehaviorSubject, Observable} from 'rxjs';
import {Actor} from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class GetActorsService {

  private behaviorSubject$;
  behaviorSubjectObservable$: Observable<Actor[]>;
  actors: [];
  constructor(private httpClient: HttpClient,
              private objectsContainerService: ObjectsContainerService) {
    this.behaviorSubject$ = new BehaviorSubject(this.actors);
    this.behaviorSubjectObservable$ = this.behaviorSubject$.asObservable();
  }

  loadActors(){
    const movieId = this.objectsContainerService.getMovie().id;
    const url = `${API_URL}${movieId}/credits`;
    this.httpClient.get(url).subscribe((response: any) => {
      const result = response.cast.map(item => new Actor(
          item.name,
          item.profile_path
      )).slice(0, 5);
      this.behaviorSubject$.next(result);
    }, e => {
    });
}
}
