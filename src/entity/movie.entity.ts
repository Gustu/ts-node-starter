import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Rating from "./rating.entity";
import Comment from "./comment.entity";
import {MovieJSON} from "../types";

@Entity('movie')
export default class Movie {

    @PrimaryGeneratedColumn({name: 'movie_id'})
    movieId?: number;

    @Column({name: 'imdb_id'})
    imdbId: string;

    @Column({nullable: true})
    title: string;

    @Column({type: 'int', nullable: true})
    year: number;

    @Column({nullable: true})
    released: Date;

    @Column({nullable: true})
    runtime: string;

    @Column({nullable: true})
    genre: string;

    @Column({nullable: true})
    director: string;

    @Column({nullable: true})
    writer: string;

    @Column({nullable: true})
    actors: string;

    @Column({nullable: true})
    plot: string;

    @Column({nullable: true})
    language: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    awards: string;

    @Column({nullable: true})
    poster: string;

    @Column({type: 'int', nullable: true})
    metascore: number;

    @Column({name: 'imdb_rating', type: 'numeric', precision: 2, scale: 1, nullable: true})
    imdbRating: number;

    @Column({name: 'imdb_votes', type: 'int', nullable: true})
    imdbVotes: number;

    @Column({nullable: true})
    type: string;

    @Column({nullable: true})
    dvd: Date;

    @Column({name: 'box_office', nullable: true})
    boxOffice: string;

    @Column({nullable: true})
    production: string;

    @Column({nullable: true})
    website: string;

    @OneToMany(() => Rating, rating => rating.movie, {
        cascade: true
    })
    ratings?: Rating[];

    @OneToMany(() => Comment, comment => comment.movie)
    comments?: Comment[];

    static fromJSON(json: MovieJSON): Movie {
        return Object.assign(new Movie(), {
            imdbId: json.imdbID,
            title: json.Title,
            year: json.Year,
            rated: json.Rated,
            released: json.Released,
            runtime: json.Runtime,
            genre: json.Genre,
            director: json.Director,
            writer: json.Writer,
            actors: json.Actors,
            plot: json.Plot,
            language: json.Language,
            country: json.Country,
            awards: json.Awards,
            poster: json.Poster,
            metascore: json.Metascore,
            imdbRating: json.imdbRating,
            imdbVotes: json.imdbVotes,
            type: json.Type,
            dvd: json.DVD,
            boxOffice: json.BoxOffice,
            production: json.Production,
            website: json.Website,
        }, {
            ratings: json.Ratings.map(rating => Rating.fromJSON(rating))
        });
    }

}
