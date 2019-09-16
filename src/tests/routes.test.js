const request = require('supertest');
const app = require('../app');


describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true)
    })
});


describe('Home Endpoint', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
    })
});

describe('User Endpoints', () => {
    it('should get a 401 unathorized', async () => {
        const res = await request(app)
            .post('/api/user/signin')
            .send({
                email: "a@b.com",
                password: "xyz"
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('success')
    })
});


describe('User Signin Endpoints', () => {
    it('should get a 200', async () => {
        const res = await request(app)
            .post('/api/user/signin')
            .send({
                email: "foo.bar@gmail.com",
                password: "123"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success')
    })
});

describe('Admin Signin Endpoints', () => {
    it('should get a 401 unauthorized', async () => {
        const res = await request(app)
            .post('/api/admin/signin')
            .send({
                email: "foo.bar@gmail.com",
                password: "123"
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toHaveProperty('success')
    })
});

describe('Public Endpoints', () => {
    it('should get a 201', async () => {
        const res = await request(app)
            .get('/api/fixtures/search-teams')
            .query({search: 'test'})
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('searchResults')
    })
});