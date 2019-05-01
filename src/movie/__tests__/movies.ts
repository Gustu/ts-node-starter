import request from "supertest";
import app from "../../app"
import {expect} from 'chai';
import {clearTestDb, setupTestDb} from "../../db";

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
                })

            return request(app)
                .get('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.length.gt(0);
                });
        });

        it('should return no movies when no movies in database', async () => {
            return request(app)
                .get('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.length(0);
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
                    expect(res.body).not.null;
                });

            return request(app)
                .get(`/api/movies/${res.body.movieId}`)
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

        it('should create and return a new movie', () => {
            return request(app)
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
