import {Router} from 'express';
import MovieRepository from './MovieRepository';
import MovieService from './MovieService';
import asyncMiddleware from "../middleware/async";
import {Json} from "../types";

const router = Router();

router.get('/', asyncMiddleware(async (req, res) => {
    const movies = await MovieRepository.getMovies();
    res.send(Json.ok(movies));
}));

router.get('/:movieId', asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;
    const movies = await MovieRepository.getMovieById(movieId);
    res.send(Json.ok(movies));
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const {phrase} = req.body;
    const movie = await MovieService.getMovie(phrase);
    const found = await MovieRepository.getMovieByImdbId(movie.imdbId);

    if (found) {
        return res.send(Json.ok(found))
    }

    const createdMovie = await MovieRepository.createMovie(movie);
    res.send(Json.ok(createdMovie));
}));

export default router;
