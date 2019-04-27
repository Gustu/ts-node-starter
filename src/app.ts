import express from 'express';
import bodyParser from "body-parser";
import routes from './routes';

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.use((req, res, next) => {
    if (!req.route) {
        return res.status(404).json({message: 'Resource not found.'});
    }
    next();
});

export default app;
