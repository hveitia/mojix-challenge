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
  // List of movies to show
  movieList: Movie[];

  // Subscriber
  private sub = new SubSink();

  // Flag to manage the state of the internet connection
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
    // Get movies
    this.sub.sink = this.getPopularMoviesService.behaviorSubjectObservable$.subscribe(data => {
      this.movieList = data;
      this.loading = false;
    }, error => {});

    // Watch network for a disconnection
    this.sub.sink = this.network.onDisconnect().subscribe(() => {
      this.isConnected = false;
      this.dbService.getAllMovies().then(data => {
        this.movieList = data;
      });
    });

    // Watch network for a connection
    this.sub.sink = this.network.onConnect().subscribe(() => {
      this.isConnected = true;
      this.getPopularMoviesService.loadPopularMovies();
    });
  }

  ngOnDestroy() {
    // Delete subscriptions
    this.sub.unsubscribe();
  }

  // Show detail page
  goToDetail(movie: Movie){
    this.objectsContainerService.setMovie(movie);
    this.objectsContainerService.setIsConnected(this.isConnected);
    this.router.navigate(['./detail']);
  }

  // Set active language
  setLanguage(language: string){
    this.translate.use(language);
    this.activeLanguage = language;
    this.objectsContainerService.setActiveLanguage(language);
    this.getPopularMoviesService.loadPopularMovies();
  }
}
