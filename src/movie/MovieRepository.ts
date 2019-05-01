import Movie from "../entity/movie.entity";
import {getRepository} from "typeorm";

export const getMovies = async (): Promise<Movie[]> => {
    try {
        const movieRepo = getRepository(Movie);
        return await movieRepo.find({relations: ['ratings']})
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const createNewMovie = async (movie: Movie): Promise<Movie> => {
    try {
        return await getRepository(Movie).save(movie);
    } catch (err) {
        console.log(err);
        throw null;
    }
};

export default {
    getMovies,
    createNewMovie
}
