import 'reflect-metadata';
import express from 'express';
import bodyParser from "body-parser";
import routes from './routes';
import cors from 'cors';
import logger from 'morgan';
import {createConnection} from "typeorm";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logger('tiny'));

app.use('/api', routes);

app.use((req, res, next) => {
    if (!req.route) {
        return res.status(404).json({message: 'Resource not found.'});
    }
    next();
});

const setupConnection = async () => {
    try {
        await createConnection();

        console.log('DB connection established.');
    } catch (err) {
        console.log('Could not establish DB connection.', err);
    }
};

setupConnection();

export default app;
