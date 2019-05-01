import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Movie from "./movie.entity";

@Entity('comment')
export default class Comment {

    @PrimaryGeneratedColumn({name: 'comment_id'})
    commentId: number;

    @Column({name: 'movie_id'})
    movieId: number;

    @Column()
    username: string;

    @Column()
    message: string;

    @ManyToOne(() => Movie, movie => movie.comments)
    @JoinColumn({name: 'movie_id'})
    movie: Movie;

}
