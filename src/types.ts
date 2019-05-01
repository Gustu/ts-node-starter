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
