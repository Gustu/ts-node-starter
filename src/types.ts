export class MovieJSON {
    Title: string;
    Year: number;
    Rated: string;
    Released: Date;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: RatingJSON[];
    Metascore: number;
    imdbRating: number;
    imdbVotes: number;
    imdbID: string;
    Type: string;
    DVD: Date;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export class RatingJSON {
    Source: string;
    Value: string;
}

export class CommentJSON {
    movieId: number;
    username: string;
    message: string;
}

export enum Status {
    OK = "OK", ERROR = "ERROR"
}

export class Json<T> {
    status: Status;
    code: number;
    message?: string;
    data?: T;

    static ok<U>(data: U, code?: number) {
        let response = new Json();
        response.status = Status.OK;
        response.code = code | 200;
        response.data = data;
        return response;
    }

    static error(message: string, code?: number) {
        let response = new Json();
        response.status = Status.ERROR;
        response.code = code || 500;
        response.message = message;
        return response;
    }
}
