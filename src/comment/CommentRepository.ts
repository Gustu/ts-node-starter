import { getRepository } from 'typeorm';
import Comment from '../entity/comment.entity';

export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    return await getRepository(Comment).save(comment);
  } catch (err) {
    console.log(err);
    throw Error('Could not create comment');
  }
};

export const getMovieComments = async (movieId: number): Promise<Comment[]> => {
  try {
    return await getRepository(Comment).find({ where: { movieId } });
  } catch (err) {
    console.log(err);
    throw Error('Could not get movie comments');
  }
};

export const getAllComments = async (): Promise<Comment[]> => {
  try {
    return await getRepository(Comment).find();
  } catch (err) {
    console.log(err);
    throw Error('Could not get movie comments');
  }
};

export default {
  createComment,
  getMovieComments,
  getAllComments
};
