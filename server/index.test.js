const request = require('supertest');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const app = require('./index');

jest.mock('pg', () => {
	const mPool = {
		query: jest.fn(),
	};
	return { Pool: jest.fn(() => mPool) };
});

jest.mock('bcryptjs', () => ({
	hash: jest.fn(),
	compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
	sign: jest.fn(),
}));

const mockHashedPassword = '$2a$10$example';
const mockToken = 'example_token';
bcrypt.hash.mockResolvedValue(mockHashedPassword);
bcrypt.compare.mockResolvedValue(true);
jwt.sign.mockReturnValue(mockToken);

const pool = new Pool();

describe('/register endpoint', () => {
	it('should register a user successfully', async () => {
		pool.query.mockResolvedValueOnce({
			rows: [{ id: 1 }],
			rowCount: 1,
		});
		const response = await request(app)
			.post('/register')
			.send({ username: 'testuser', password: 'password' });

		expect(response.statusCode).toBe(201);
		expect(response.body).toHaveProperty('message', 'User registered');
		expect(response.body).toHaveProperty('userId', 1);
	});

	
});

describe('/login endpoint', () => {
	it('should log in a user successfully', async () => {
		pool.query.mockResolvedValueOnce({
			rows: [{ id: 1, password: mockHashedPassword }],
			rowCount: 1,
		});
		const response = await request(app)
			.post('/login')
			.send({ username: 'testuser', password: 'password' });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Logged in successfully!!!');
		expect(response.body).toHaveProperty('token', mockToken);
	});

	
});

afterAll(async () => {
    await pool.end();
});