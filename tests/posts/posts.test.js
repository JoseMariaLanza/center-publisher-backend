const mongoose = require('mongoose');
const supertest = require('supertest');
const { set } = require('../../app');
const app = require('../../app');
require('dotenv').config();

const { NODE_ENV, MONGO_DB_URI, MONGO_DB_URI_TEST } = process.env;

const connectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI;

beforeAll(async () => {
    await mongoose.connect(connectionString);
});

const api = supertest(app);

describe('Posts', () => {
    test('Unauthenticated, user can\'t get posts - Http Bad Request.', async () => {
        await api
            .get('/api/posts')
            .expect('Content-Type', /application\/json/)
            .expect(400)
    })

    test('Unauthorized, user send worng token - Http Unauthorized.', async () => {
        await api
            .get('/api/posts')
            .set('Authorization', 'Wrong token')
            .expect('Content-Type', /application\/json/)
            .expect(401)
    })

    test('All posts are retrived as json - Http OK', async () => {
        const userData = {
            email: 'lanza.josemaria@gmail.com',
            password: '123456'
        };

        const { _body } = await api
            .post('/api/auth').send(userData);
        const token = _body.data.token;

        await api
            .get('/api/posts')
            .set('Authorization', `Token ${token}`)
            .expect('Content-Type', /application\/json/)
            .expect(200)
    })
});


afterAll(async () => {
    await mongoose.connection.close();
});
