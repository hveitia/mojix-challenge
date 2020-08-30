import { Component, OnInit } from '@angular/core';
import {Movie} from '../home/models/movie';
import {ObjectsContainerService} from '../shared/services/objects-container.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  movie: Movie;
  isConnected = true;
  constructor(private objectsContainerService: ObjectsContainerService) { }

  ngOnInit() {
    this.movie = this.objectsContainerService.getMovie();
    this.isConnected = this.objectsContainerService.getIsConnected();
  }

}
