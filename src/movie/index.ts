import {Router} from 'express';
import MovieRepository from './MovieRepository';
import MovieService from './MovieService';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await MovieRepository.getMovies();
    res.send(movies);
});

router.get('/:movieId', async (req, res) => {
    const {movieId} = req.params;
    const movies = await MovieRepository.getMovieById(movieId);
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {phrase} = req.body;
    const movie = await MovieService.getMovie(phrase);
    const found = await MovieRepository.getMovieByImdbId(movie.imdbId);

    if (found) {
        return res.send(found)
    }

    const createdMovie = await MovieRepository.createMovie(movie);
    res.send(createdMovie);
});

export default router;
