import Movie from '../entity/movie.entity';
import {getRepository} from 'typeorm';

const getMovies = async (): Promise<Movie[]> => {
    return await getRepository(Movie).find({
        relations: ['ratings', 'comments']
    });
};

const getMovieById = async (movieId: number): Promise<Movie> => {
    return await getRepository(Movie).findOne({
        where: {movieId},
        relations: ['ratings', 'comments']
    });
};

const getMovieByImdbId = async (imdbId: string): Promise<Movie> => {
    return await getRepository(Movie).findOne({
        where: {imdbId},
        relations: ['ratings', 'comments']
    });
};

const createMovie = async (movie: Movie): Promise<Movie> => {
    return await getRepository(Movie).save(movie);
};

export default {
    getMovieByImdbId,
    getMovies,
    createMovie,
    getMovieById
};
