import { Router } from 'express';
import MovieController from './movie';
import CommentsController from './comment';

const router = Router();

router
    .use('/movies', MovieController)
    .use('/movies/:movieId/comments', CommentsController.restRouter)
    .use('/comments', CommentsController.router); // not REST endpoint - wanted in requirements

export default router;
