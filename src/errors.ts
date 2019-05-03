import {Json, Status} from "./types";

export class NotFoundError extends Json<any> {
    constructor() {
        super();
        this.status = Status.ERROR;
        this.code = 404;
        this.message = 'Resource not found';
    }
}

export class BadRequestError extends Json<any> {
    constructor() {
        super();
        this.status = Status.ERROR;
        this.code = 400;
        this.message = 'Bad request';
    }
}

export class InternalServerError extends Json<any> {
    constructor() {
        super();
        this.status = Status.ERROR;
        this.code = 500;
        this.message = 'Internal server error';
    }
}

export class MovieNotFoundError extends Json<any> {
    constructor() {
        super();
        this.status = Status.ERROR;
        this.code = 400;
        this.message = 'Wrong title.';
    }
}

export class ValidationError extends Json<any> {
    constructor(errors) {
        super();
        this.status = Status.ERROR;
        this.code = 422;
        this.message = errors;
    }
}
