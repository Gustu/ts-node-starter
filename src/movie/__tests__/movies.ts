import request from "supertest";
import app from "../../app"
import {expect} from 'chai';
import {setupTestDb} from "../../db";

describe('Movie', function () {

    beforeEach(async () => {
        await setupTestDb();
    });

    describe('GET /movies', function () {
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
                })
        });
    });

    describe('POST /movies', function () {
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
