import {Router} from 'express';
import {CommentJSON, Json} from '../types';
import CommentRepository from './CommentRepository';
import Comment from '../entity/comment.entity';
import asyncMiddleware from "../middleware/async";
import {body, param, query} from "express-validator/check";

const getMovieCommentsValidation = [
    param('movieId').exists().isInt()
];

const createCommentValidation = [
    param('movieId').exists().isInt(),
    body('username').exists().isString().isLength({min: 1, max: 255}),
    body('message').exists().isString().isLength({min: 1, max: 255}),
];

const createMovieNotRestValidation = [
    body('movieId').exists().isInt(),
    body('username').exists().isString().isLength({min: 1, max: 255}),
    body('message').exists().isString().isLength({min: 1, max: 255}),
];

const getAllOrMovieCommentsValidation = [
    query('movieId').optional().isInt(),
];

const createComment = asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;
    const comment = Object.assign(new CommentJSON(), req.body, {movieId});

    const newComment = await CommentRepository.createComment(
        Comment.fromJSON(comment)
    );

    res.send(Json.ok(newComment));
});

const getMovieComments = asyncMiddleware(async (req, res) => {
    const {movieId} = req.params;

    const comments = await CommentRepository.getMovieComments(movieId);

    res.send(Json.ok(comments));
});

const getAllOrMovieComments = asyncMiddleware(async (req, res) => {
    const {movieId} = req.query;
    let comments = [];

    if (movieId) {
        comments = await CommentRepository.getMovieComments(movieId);
    } else {
        comments = await CommentRepository.getAllComments();
    }

    res.send(Json.ok(comments));
});

const createMovieNotRest = asyncMiddleware(async (req, res) => {
    const comment = Object.assign(new CommentJSON(), req.body);

    const newComment = await CommentRepository.createComment(
        Comment.fromJSON(comment)
    );

    res.send(Json.ok(newComment));
});

const restRouter = Router({mergeParams: true});
const router = Router();

restRouter.post('/', createCommentValidation, createComment);
restRouter.get('/', getMovieCommentsValidation, getMovieComments);

router.get('/', getAllOrMovieCommentsValidation, getAllOrMovieComments);
router.post('/', createMovieNotRestValidation, createMovieNotRest);

export default {restRouter, router};
