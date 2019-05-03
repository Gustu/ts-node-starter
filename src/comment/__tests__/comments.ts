import request from "supertest";
import app from "../../app"
import {expect} from 'chai';
import {clearTestDb, setupTestDb} from "../../db";
import sinon from 'sinon';
import MovieService from '../../movie/MovieService';

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

describe('Comments', function () {

    beforeEach(async () => {
        await setupTestDb();
    });

    afterEach(async () => {
        await clearTestDb();
    });

    describe('GET /comments', function () {

        beforeEach(async () => {
            await clearTestDb();
        });

        it('should return no comments when no comments in database', async () => {
            return request(app)
                .get('/api/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).to.have.length(0);
                })
        });

        it('should return one comment from database', async () => {
            const {body: {data: {movieId}}} = await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).not.null;
                });

            await request(app)
                .post('/api/comments')
                .send({username: 'Avenger', message: 'Something', movieId})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).not.null;
                });

            return await request(app)
                .get('/api/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body.data).to.have.length(1);
                    expect(res.body.data[0].username).to.be.eq('Avenger');
                    expect(res.body.data[0].message).to.be.eq('Something');
                    expect(res.body.data[0].movieId).to.be.eq(movieId);
                })
        });
    });

    describe('POST /comments', function () {

        beforeEach(async () => {
            await clearTestDb();
        });

        it('should create one comment', async () => {
            const {body: {data: {movieId}}} = await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });

            return await request(app)
                .post('/api/comments')
                .send({username: 'Avenger', message: 'Something', movieId})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });
        });
    });

});
