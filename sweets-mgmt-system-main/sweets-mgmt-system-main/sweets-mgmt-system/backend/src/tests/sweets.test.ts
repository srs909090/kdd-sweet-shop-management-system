import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let token: string;

describe('Sweets Endpoints', () => {
    beforeAll(async () => {
        // Authenticate and get token
        await prisma.user.deleteMany();
        await prisma.sweet.deleteMany();

        const authRes = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'admin@sweets.com',
                password: 'password123',
            });
        token = authRes.body.token;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /api/sweets', () => {
        it('should create a new sweet', async () => {
            const res = await request(app)
                .post('/api/sweets')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Chocolate Bar',
                    category: 'Chocolates',
                    price: 2.5,
                    quantity: 100,
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe('Chocolate Bar');
        });

        it('should return 401 if not authenticated', async () => {
            const res = await request(app)
                .post('/api/sweets')
                .send({
                    name: 'Candy',
                    category: 'Sweets',
                    price: 1.0,
                    quantity: 50,
                });

            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/sweets', () => {
        it('should return all sweets', async () => {
            await prisma.sweet.create({
                data: {
                    name: 'Lollipop',
                    category: 'Hard Candy',
                    price: 0.5,
                    quantity: 200,
                },
            });

            const res = await request(app)
                .get('/api/sweets')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/sweets/search', () => {
        it('should search sweets by name', async () => {
            const res = await request(app)
                .get('/api/sweets/search?q=Lollipop')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body[0].name).toContain('Lollipop');
        });
    });

    describe('PUT /api/sweets/:id', () => {
        // Need ID from previous creation
        let sweetId: string;
        beforeAll(async () => {
            const sweet = await prisma.sweet.findFirst({ where: { name: 'Lollipop' } });
            if (sweet) sweetId = sweet.id;
        });

        it('should update sweet details', async () => {
            const res = await request(app)
                .put(`/api/sweets/${sweetId}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    price: 0.75,
                    quantity: 150
                }); // Testing partial update? Controller might expect full object if not careful, checking requirements: "Update a sweet's details"

            // My current update logic is not implemented yet. So this test will fail (Red).
            // Wait, I need to implement the route first or strict TDD?
            // "Write tests before implementing functionality."

            expect(res.status).toBe(200); // Or 200
            expect(res.body.price).toBe(0.75);
        });
    });

    describe('DELETE /api/sweets/:id', () => {
        let sweetId: string;
        beforeAll(async () => {
            const sweet = await prisma.sweet.create({
                data: { name: 'To Delete', category: 'Test', price: 1, quantity: 1 }
            });
            sweetId = sweet.id;
        });

        it('should delete a sweet', async () => {
            const res = await request(app)
                .delete(`/api/sweets/${sweetId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200); // or 204

            const check = await prisma.sweet.findUnique({ where: { id: sweetId } });
            expect(check).toBeNull();
        });
    });
});
