import Movie from '../entity/movie.entity';
import { getRepository } from 'typeorm';

const getMovies = async (): Promise<Movie[]> => {
  try {
    return await getRepository(Movie).find({
      relations: ['ratings', 'comments']
    });
  } catch (err) {
    console.log(err);
    throw Error('Could not get movies');
  }
};

const getMovieById = async (movieId: number): Promise<Movie> => {
  try {
    return await getRepository(Movie).findOne({
      where: {movieId},
      relations: ['ratings', 'comments']
    });
  } catch (err) {
    console.log(err);
    throw Error('Could not get movies');
  }
};

const getMovieByImdbId = async (imdbId: string): Promise<Movie> => {
  try {
    return await getRepository(Movie).findOne({
      where: { imdbId },
      relations: ['ratings', 'comments']
    });
  } catch (err) {
    console.log(err);
    throw Error('Could not get movies');
  }
};

const createMovie = async (movie: Movie): Promise<Movie> => {
  try {
    return await getRepository(Movie).save(movie);
  } catch (err) {
    console.log(err);
    throw Error('Could not create movie');
  }
};

export default {
  getMovieByImdbId,
  getMovies,
  createMovie,
  getMovieById
};
