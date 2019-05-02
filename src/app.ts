import 'reflect-metadata';
import express from 'express';
import bodyParser from "body-parser";
import routes from './routes';
import cors from 'cors';
import logger from 'morgan';
import {Json} from "./types";
import {InternalServerError, NotFoundError} from "./errors";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logger('tiny'));

app.use('/api', routes);

app.use((req, res, next) => {
    if (!req.route) {
        return res.status(404).json(new NotFoundError());
    }
    next();
});

app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json(new InternalServerError());
    }
    next();
});

export default app;
