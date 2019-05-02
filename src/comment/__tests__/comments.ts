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
                    expect(res.body).to.have.length(0);
                })
        });

        it('should return one comment from database', async () => {
            const {body: {movieId}} = await request(app)
                .post('/api/movies')
                .send({phrase: 'Avengers'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });

            await request(app)
                .post('/api/comments')
                .send({username: 'Avenger', message: 'Something', movieId})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).not.null;
                });

            return request(app)
                .get('/api/comments')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(res => {
                    expect(res.body).to.have.length(1);
                    expect(res.body[0].username).to.be.eq('Avenger');
                    expect(res.body[0].message).to.be.eq('Something');
                    expect(res.body[0].movieId).to.be.eq(movieId);
                })
        });
    });

});
