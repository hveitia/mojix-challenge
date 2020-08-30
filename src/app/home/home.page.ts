import {Component, OnDestroy, OnInit} from '@angular/core';
import {GetPopularMoviesService} from './services/movie-services/get-popular-movies.service';
import {SubSink} from 'subsink';
import {Movie} from './models/movie';
import {ObjectsContainerService} from '../shared/services/objects-container.service';
import {Router} from '@angular/router';
import {DbService} from '../shared/services/db.service';
import {Network} from '@ionic-native/network/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy{
  movieList: Movie[];
  private sub = new SubSink();
  isConnected = true;
  activeLanguage = 'en';
  loading = true;
  constructor(private getPopularMoviesService: GetPopularMoviesService,
              private objectsContainerService: ObjectsContainerService,
              private router: Router,
              private dbService: DbService,
              private network: Network,
              private translate: TranslateService,
              ) {}

  ngOnInit() {
    this.sub.sink = this.getPopularMoviesService.behaviorSubjectObservable$.subscribe(data => {
      this.movieList = data;
      this.loading = false;
    }, error => {});
    // watch network for a disconnection
    this.sub.sink = this.network.onDisconnect().subscribe(() => {
      this.isConnected = false;
      this.dbService.getAllMovies().then(data => {
        this.movieList = data;
      });
    });
    this.sub.sink = this.network.onConnect().subscribe(() => {
      this.isConnected = true;
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      this.getPopularMoviesService.loadPopularMovies();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  goToDetail(movie: Movie){
    this.objectsContainerService.setMovie(movie);
    this.objectsContainerService.setIsConnected(this.isConnected);
    this.router.navigate(['./detail']);
  }

  setLanguaje(languaje: string){
    this.translate.use(languaje);
    this.activeLanguage = languaje;
    this.objectsContainerService.setActiveLanguage(languaje);
    this.getPopularMoviesService.loadPopularMovies();
  }
}
