import {Router} from 'express';
import {CommentJSON, Json} from '../types';
import CommentRepository from './CommentRepository';
import Comment from '../entity/comment.entity';
import asyncMiddleware from "../middleware/async";

//////////////////////////////////////////////

const restRouter = Router({mergeParams: true});

restRouter.post('/', asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;
    const comment = Object.assign(new CommentJSON(), req.body, {movieId});

    const newComment = await CommentRepository.createComment(
        Comment.fromJSON(comment)
    );

    res.send(Json.ok(newComment));
}));

restRouter.get('/', asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;

    const comments = await CommentRepository.getMovieComments(movieId);

    res.send(Json.ok(comments));
}));

//////////////////////////////////////////////

const router = Router();

router.get('/', asyncMiddleware(async (req, res) => {
    const {movieId} = req.query;
    let comments = [];

    if (movieId) {
        comments = await CommentRepository.getMovieComments(movieId);
    } else {
        comments = await CommentRepository.getAllComments();
    }

    res.send(Json.ok(comments));
}));

router.post('/', asyncMiddleware(async (req, res) => {
    const comment = Object.assign(new CommentJSON(), req.body);

    const newComment = await CommentRepository.createComment(
        Comment.fromJSON(comment)
    );

    res.send(Json.ok(newComment));
}));

//////////////////////////////////////////////

export default {restRouter, router};
