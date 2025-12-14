import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Sweet Shop API is running' });
    });
});
