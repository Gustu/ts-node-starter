import express from "express";
import MovieController from './movie';

const router = express.Router();

router.use('/movies', MovieController);

export default router;
