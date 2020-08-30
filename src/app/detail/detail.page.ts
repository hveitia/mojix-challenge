import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../home/models/movie';
import {ObjectsContainerService} from '../shared/services/objects-container.service';
import {GetActorsService} from './services/get-actors.service';
import {SubSink} from 'subsink';
import {Actor} from './models/actor';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {

  movie: Movie;
  actorsList: Actor[];
  isConnected = true;
  private sub = new SubSink();
  constructor(private objectsContainerService: ObjectsContainerService,
              private getActorsService: GetActorsService) { }

  ngOnInit() {

    // Get movie from service
    this.movie = this.objectsContainerService.getMovie();

    // Get connection status
    this.isConnected = this.objectsContainerService.getIsConnected();

    // Load actors
    this.getActorsService.loadActors();

    // Get actors
    this.sub.sink = this.getActorsService.behaviorSubjectObservable$.subscribe(data => {
      this.actorsList = data;
    }, error => {});
  }
  ngOnDestroy() {
    // Delete subscriptions
    this.sub.unsubscribe();
  }

}
