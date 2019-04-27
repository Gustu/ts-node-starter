import request from "supertest";
import app from "../../app"

describe('Movie', function () {
    describe('GET /movies', function () {
        it('should return all movies from database',   () => {
            return request(app)
                .get('/api/movies')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).toBeDefined();
                })
        });
    });

    describe('POST /movies', function () {
        it('should create and return a new movie',   () => {
            return request(app)
                .post('/api/movies')
                .send({name: 'Back To The Future'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).toBeDefined();
                })
        });
    });
});
