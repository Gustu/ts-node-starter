import express from "express";
import {InternalServerError, ValidationError} from "../errors";
import {validationResult} from "express-validator/check";

const asyncMiddleware = (fn) => (req: express.Request, res: express.Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(new ValidationError(errors.array()));
    }

    Promise
        .resolve(fn(req, res, next))
        .catch(err => {
            console.log(err);
            res.status(500).json(new InternalServerError());
        })
};

export default asyncMiddleware;
