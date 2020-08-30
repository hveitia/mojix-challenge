
export class Movie {
    id: number;
    posterPath: string;
    title: string;
    voteAverage: string;
    overview: string;
    releaseDate: string;
    backdropPath: string;

    constructor(
        id: number,
        posterPath: string,
        title: string,
        voteAverage: string,
        overview: string,
        releaseDate: string,
        backdropPath: string,
    ) {
        this.id = id;
        this.posterPath = posterPath;
        this.title = title;
        this.voteAverage = voteAverage;
        this.overview = overview;
        this.releaseDate = releaseDate;
        this.backdropPath = backdropPath;
    }

    getPosterImage(){
        return `https://image.tmdb.org/t/p/w400/${this.posterPath}`;
    }

    getBackdropImage(){
        return `https://image.tmdb.org/t/p/w400/${this.backdropPath}`;
    }
}
