export  class Actor{
    name: string;
    profilePath: string;

    constructor(name: string, profilePath: string ){
        this.name = name;
        this.profilePath = profilePath;
    }

    getPosterImage(){
        return `https://image.tmdb.org/t/p/w400/${this.profilePath}`;
    }
}
