import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Movie} from '../../home/models/movie';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject;
  constructor(private sqlite: SQLite) {}

  async getAllMovies() {
    let movies: Movie[] = [];
    return this.sqlite.create({ name: 'data.db', location: 'default' }).then(
        (db) => {
          this.dbInstance = db;
          db.executeSql('CREATE TABLE IF NOT EXISTS '
              + 'MOVIES(id INTEGER PRIMARY KEY AUTOINCREMENT,'
              + ' posterPath TEXT, title TEXT,'
              + ' voteAverage TEXT, overview TEXT, releaseDate TEXT, backdropPath TEXT )', [])
              .catch(e => console.log(e));
          movies = this.getAllRecords();
        }
    ).catch().then((e) => {
      console.log(e);
      return movies;
    });
  }

  private getAllRecords(): Movie[] {
    const movies: Movie[] = [];
    this.dbInstance.executeSql('select * from MOVIES', []).then(
        (res) => {
          for (let x = 0; x < res.rows.length; x++) {
            movies.push(res.rows.item(x));
          }
        }
    ).catch(e => {
      console.log(e);
    });
    return movies;
  }

  async addMovie(movie: Movie) {
    const {id, posterPath, title, voteAverage, overview, releaseDate, backdropPath} = movie;
    this.dbInstance.executeSql('insert into MOVIES(id, posterPath, title, voteAverage, overview, releaseDate, backdropPath)' +
        ' VALUES(?, ?, ?, ?, ?, ?, ?)',
        [id, posterPath, title, voteAverage, overview, releaseDate, backdropPath ])
        .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteAll() {
    this.dbInstance.executeSql('DELETE FROM MOVIES', [])
        .catch(e => console.log(e));
    return this.getAllRecords();
  }
}
