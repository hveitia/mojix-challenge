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
  sliderOptions = {
    initialSlide: 0,
    slidePerView: 1.1,
    freeMode: true,
    speed: 400
  };
  constructor(private objectsContainerService: ObjectsContainerService,
              private getActorsService: GetActorsService) { }

  ngOnInit() {
    this.movie = this.objectsContainerService.getMovie();
    this.isConnected = this.objectsContainerService.getIsConnected();
    this.getActorsService.loadActors();
    this.sub.sink = this.getActorsService.behaviorSubjectObservable$.subscribe(data => {
      this.actorsList = data;
    }, error => {});
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
