import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetPopularMoviesService} from './services/movie-services/get-popular-movies.service';
import {SubSink} from 'subsink';
import {Movie} from './models/movie';
import {NavController} from '@ionic/angular';
import {ObjectsContainerService} from '../shared/services/objects-container.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  movieList: Movie[];
  private sub = new SubSink();
  constructor(private navCtrl: NavController,
              private getPopularMoviesService: GetPopularMoviesService,
              private objectsContainerService: ObjectsContainerService,
              ) {}

  ngOnInit() {
    this.sub.sink = this.getPopularMoviesService.behaviorSubjectObservable$.subscribe(res => {
      this.movieList = res;
    }, error => {});
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToDetail(movie: Movie){
    this.objectsContainerService.setMovie(movie);
    this.navCtrl.navigateRoot(['./detail']);
  }
}
