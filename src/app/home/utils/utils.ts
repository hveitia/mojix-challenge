// @ts-ignore
import moment from 'moment';
import {Movie} from '../models/movie';

export const orderByDate = (movies: Movie[]) => {
    return movies.sort((a, b) => {
        if (moment(a.releaseDate, 'YYYY-MM-DD').isBefore(moment(b.releaseDate, 'YYYY-MM-DD'))) {
            return 1;
        }
        if (moment(a.releaseDate, 'YYYY-MM-DD').isAfter(moment(b.releaseDate, 'YYYY-MM-DD'))) {
            return -1;
        }
        return 0;
    });
};
