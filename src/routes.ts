import {Router} from "express";
import MovieController from './movie';

const router = Router();

router.use('/movies', MovieController);

export default router;
