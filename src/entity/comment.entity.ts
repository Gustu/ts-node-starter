import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index
} from 'typeorm';
import Movie from './movie.entity';
import { CommentJSON } from '../types';

@Entity('comment')
export default class Comment {
  @PrimaryGeneratedColumn({ name: 'comment_id' })
  commentId: number;

  @Column({ name: 'movie_id' })
  @Index()
  movieId: number;

  @Column()
  username: string;

  @Column()
  message: string;

  @ManyToOne(() => Movie, movie => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  static fromJSON(json: CommentJSON): Comment {
    return Object.assign(new Comment(), json);
  }
}
