const request = require('supertest');
const { app, pool } = require('./index');

beforeEach(async () => {
	await pool.query('DELETE FROM users');
});

beforeEach(async () => {
	await pool.query(`INSERT INTO users(username, password) VALUES('test', '$2b$10$xLnvndBaiXeiGAnB9EtwfuPPV7NNVcAYprnZGX/OTxTlzXIO9qDQm')`);
});

afterAll(() => {
	pool.end();
});

describe('Register', () => {
	it('returns 201 and userId on success', async () => {
		const res = await request(app)
			.post('/register')
			.send({
				username: 'test12',
				password: 'password123',
			});

		expect(res.statusCode).toEqual(201);
		expect(res.body.userId).toBeDefined();
	});

	it('returns 400 if username is missing', async () => {
		const res = await request(app)
			.post('/register')
			.send({
				password: 'password123',
			});

		expect(res.statusCode).toEqual(400);
	});
});

describe('Login', () => {
	it('returns 400 on invalid credentials', async () => {
		const res = await request(app)
			.post('/login')
			.send({
				username: 'test',
				password: 'wrongpassword',
			});

		expect(res.statusCode).toEqual(400);
	});
});
