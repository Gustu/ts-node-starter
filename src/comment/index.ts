import { Router } from 'express';
import { CommentJSON } from '../types';
import CommentRepository from './CommentRepository';
import Comment from '../entity/comment.entity';

//////////////////////////////////////////////

const restRouter = Router({ mergeParams: true });

restRouter.post('/', async (req, res) => {
  const { movieId } = req.params;
  const comment = Object.assign(new CommentJSON(), req.body, { movieId });

  const newComment = await CommentRepository.createComment(
    Comment.fromJSON(comment)
  );

  res.send(newComment);
});

restRouter.get('/', async (req, res) => {
  const { movieId } = req.params;

  const comments = await CommentRepository.getMovieComments(movieId);

  res.send(comments);
});

//////////////////////////////////////////////

const router = Router();

router.get('/', async (req, res) => {
  const { movieId } = req.query;
  let comments = [];

  if (movieId) {
    comments = await CommentRepository.getMovieComments(movieId);
  } else {
    comments = await CommentRepository.getAllComments();
  }

  res.send(comments);
});

router.post('/', async (req, res) => {
  const comment = Object.assign(new CommentJSON(), req.body);

  const newComment = await CommentRepository.createComment(
    Comment.fromJSON(comment)
  );

  res.send(newComment);
});

//////////////////////////////////////////////

export default { restRouter, router };
