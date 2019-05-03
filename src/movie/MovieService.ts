import Movie from '../entity/movie.entity';
import superagent from 'superagent';
import {MovieJSON} from "../types";

const API_URL = 'http://www.omdbapi.com';

export const getMovie = async (name: String): Promise<Movie> => {
    try {
        const res = await superagent
            .get(API_URL)
            .timeout({
                response: 100
            })
            .query({apiKey: process.env.OMDB_API_KEY, t: name})
            .set('accept', 'json');

        console.log(res.body.Response);

        if (res.body.Response === "False") {
            return null;
        }

        const votes = res.body.imdbVotes.toString().replace(/,/g, '');
        const json: MovieJSON = Object.assign(
            new MovieJSON(),
            res.body,
            {imdbVotes: votes}
        );

        return Movie.fromJSON(json);
    } catch (err) {
        if (err.timeout) {
            throw Error('Timeout!');
        }
    }
};

export default {
    getMovie
}
