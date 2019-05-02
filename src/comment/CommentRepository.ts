import {getRepository} from 'typeorm';
import Comment from '../entity/comment.entity';

export const createComment = async (comment: Comment): Promise<Comment> => {
    return await getRepository(Comment).save(comment);
};

export const getMovieComments = async (movieId: number): Promise<Comment[]> => {
    return await getRepository(Comment).find({where: {movieId}});
};

export const getAllComments = async (): Promise<Comment[]> => {
    return await getRepository(Comment).find();
};

export default {
    createComment,
    getMovieComments,
    getAllComments
};
