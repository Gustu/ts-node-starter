import express from "express";
import {Json} from "../types";
import {InternalServerError} from "../errors";

const asyncMiddleware = (fn) => (req: express.Request, res: express.Response, next) => {
    Promise
        .resolve(fn(req, res, next))
        .catch(err => {
            console.log(err);
            res.status(500).json(new InternalServerError());
        })
};

export default asyncMiddleware;
