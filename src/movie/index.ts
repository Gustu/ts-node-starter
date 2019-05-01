import {Router} from 'express';
import MovieRepository from './MovieRepository';
import MovieService from './MovieService';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await MovieRepository.getMovies();
    res.send(movies);
});

router.post('/', async (req, res) => {
    const {phrase} = req.body;
    const movie = await MovieService.getMovie(phrase);
    const createdMovie = await MovieRepository.createNewMovie(movie);
    res.send(createdMovie);
});

export default router;
