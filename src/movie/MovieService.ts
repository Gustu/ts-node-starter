import Movie from '../entity/movie.entity';
import superagent from 'superagent';
import {MovieJSON} from "../types";

const API_URL = 'http://www.omdbapi.com';

export const getMovie = async (name: String): Promise<Movie> => {
    const res = await superagent
        .get(API_URL)
        .query({apiKey: process.env.OMDB_API_KEY, t: name})
        .set('accept', 'json');

    if (res.body.Response === "False") {
        Promise.reject('No response');
    }

    const votes = res.body.imdbVotes.toString().replace(/,/g, '');
    const json: MovieJSON = Object.assign(
        new MovieJSON(),
        res.body,
        {imdbVotes: votes}
    );

    return Movie.fromJSON(json);
};

export default {
    getMovie
}
