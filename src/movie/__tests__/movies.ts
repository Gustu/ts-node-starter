import request from "supertest";
import app from "../../app"
import {expect} from 'chai';
import {clearTestDb, setupTestDb} from "../../db";
import sinon from 'sinon';
import MovieService from '../MovieService';

sinon.stub(MovieService, 'getMovie').withArgs('Avengers').returns({
    imdbId: 'json.imdbID',
    title: 'json.Title',
    year: '2015',
    rated: 'json.Rated',
    released: '22 Aug 2017',
    runtime: 'json.Runtime',
    genre: 'json.Genre',
    director: 'json.Director',
    writer: 'json.Writer',
    actors: 'json.Actors',
    plot: 'json.Plot',
    language: 'json.Language',
    country: 'json.Country',
    awards: 'json.Awards',
    poster: 'json.Poster',
    metascore: '12',
    imdbRating: '2',
    imdbVotes: '123123',
    type: 'json.Type',
    dvd: '22 Aug 2017',
    boxOffice: 'json.BoxOffice',
    production: 'json.Production',
    website: 'json.Website'
});

describe('Movie', function () {

    beforeEach(async () => {
        await setupTestDb();
    });

    afterEach(async () => {
        await clearTestDb();
    });

    describe('GET /movies', function () {

        beforeEach(async () => {
            await clearTestDb();
        });

        it('should return all movies from database', async () => {
            await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });

            return await request(app)
                .get('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).to.have.length(1);
                });
        });

        it('should return no movies when no movies in database', async () => {
            return await request(app)
                .get('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).to.have.length(0);
                })
        });
    });

    describe('GET /movies/:movieId', function () {

        beforeEach(async () => {
            await clearTestDb();
        });

        it('should return one movie from database', async () => {
            const res = await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).not.null;
                    expect(res.body.status).to.be.eq('OK');
                    expect(res.body.code).to.be.eq(200);
                    expect(res.body.data.movieId).exist;
                });

            return await request(app)
                .get(`/api/movies/${res.body.data.movieId}`)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                })
        });
    });

    describe('POST /movies', function () {

        beforeEach(async () => {
            await clearTestDb();
        });

        it('should return same movie when using same phrase', async () => {
            const firstRes = await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });

            return await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.movieId).to.be.eq(firstRes.body.movieId);
                });
        });

        it('should return error when phrase is not present', async () => {
            return await request(app)
                .post('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(422)
                .expect(res => {
                    expect(res.body.status).to.be.eq('ERROR');
                    expect(res.body.code).to.be.eq(422);
                    expect(res.body.message).to.be.not.empty;
                });
        });

        it('should return error when movie was not found in omdb', async () => {
            return await request(app)
                .post('/api/movies')
                .send({phrase: 'asdkhajk234683278941ghjfy7s8234'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .expect(res => {
                    expect(res.body.status).to.be.eq('ERROR');
                    expect(res.body.code).to.be.eq(400);
                    expect(res.body.message).to.be.not.empty;
                });
        });

        it('should create and return a new movie', async () => {
            return await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                })
        });
    });
});
