import {Router} from 'express';
import MovieRepository from './MovieRepository';
import MovieService from './MovieService';
import asyncMiddleware from "../middleware/async";
import {Json} from "../types";
import {BadRequestError, MovieNotFoundError, NotFoundError} from "../errors";
import {body, param} from "express-validator/check";

const router = Router();

const getMovieByIdValidation = [
    param('movieId').exists().isInt()
];

const createMovieValidation = [
    body('phrase').exists().isString().isLength({min: 1, max: 200})
];

const getMovies = asyncMiddleware(async (req, res) => {
    const movies = await MovieRepository.getMovies();
    res.send(Json.ok(movies));
});

const getMovieById = asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;
    const movie = await MovieRepository.getMovieById(movieId);
    if (!movie) {
        return res.send(new NotFoundError())
    }
    res.send(Json.ok(movie));
});

const createMovie = asyncMiddleware(async (req, res) => {
    const {phrase} = req.body;
    const movie = await MovieService.getMovie(phrase);

    if (!movie) {
        return res.status(400).send(new BadRequestError())
    }

    const found = await MovieRepository.getMovieByImdbId(movie.imdbId);

    if (found) {
        return res.send(Json.ok(found))
    }

    const createdMovie = await MovieRepository.createMovie(movie);
    res.send(Json.ok(createdMovie));
});

router.get('/', getMovies);
router.get('/:movieId', getMovieByIdValidation, getMovieById);
router.post('/', createMovieValidation, createMovie);

export default router;
