const request = require('supertest');
const app = require('../../app.js');

describe('Tests for IndexRoutes', () => {
    beforeAll(() => {
        jest.setTimeout(120000);
    });

    it('Should get 30 products', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "Monitor",
                limit: 30
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeDefined();
                expect(res.body.count).toEqual(30);
                expect(res.body.products.length).toEqual(30);

                done();
            });
    });

    it('Should get 100 products', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "Panela de pressao",
                limit: 100
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeDefined();
                expect(res.body.count).toEqual(100);
                expect(res.body.products.length).toEqual(100);

                done();
            });
    });

    it('Should get 400 products', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "Memoria RAM",
                limit: 400
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeDefined();
                expect(res.body.count).toEqual(400);
                expect(res.body.products.length).toEqual(400);

                done();
            });
    });

    it('Should NOT receive 30 products when a required field is missing - search', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "",
                limit: 400
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(422);
                expect(res.body).toBeDefined();
                expect(res.body.message).toEqual('"search" is not allowed to be empty');

                done();
            });
    });

    it('Should NOT receive 30 products when a required field is missing - limit', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "Memoria RAM",
                limit: ""
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(422);
                expect(res.body).toBeDefined();
                expect(res.body.message).toEqual('"limit" must be a number');

                done();
            });
    });

    it('Should NOT receive 30 products when the limit field is less than 1', done => {
        request(app)
            .post('/search-products')
            .set('Accept', 'application/json')
            .send({
                search: "Memoria RAM",
                limit: 0
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.statusCode).toEqual(422);
                expect(res.body).toBeDefined();
                expect(res.body.message).toEqual('"limit" must be larger than or equal to 1');

                done();
            });
    });
});
