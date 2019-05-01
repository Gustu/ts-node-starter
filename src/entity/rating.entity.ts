import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Movie from "./movie.entity";
import {RatingJSON} from "../types";
import {JoinColumn} from "typeorm/decorator/relations/JoinColumn";

@Entity('rating')
export default class Rating {

    @PrimaryGeneratedColumn({name: 'rating_id'})
    ratingId: number;

    @Column({name: 'movie_id'})
    movieId: number;

    @Column()
    source: string;

    @Column()
    value: string;

    @ManyToOne(() => Movie, movie => movie.ratings)
    @JoinColumn({name: 'movie_id'})
    movie: Movie;

    static fromJSON(json: RatingJSON): Rating {
        return Object.assign(new Rating(), {
            source: json.Source,
            value: json.Value
        });
    }

}
