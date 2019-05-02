import {Json, Status} from "./types";

export class NotFoundError extends Json<any> {
    constructor() {
        super();
        this.status = Status.ERROR;
        this.code = 404;
        this.message = 'Resource not found';
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
