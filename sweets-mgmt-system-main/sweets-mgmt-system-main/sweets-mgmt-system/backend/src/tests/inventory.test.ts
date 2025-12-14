import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let token: string;
let sweetId: string;

describe('Inventory Endpoints', () => {
    beforeAll(async () => {
        // Authenticate
        await prisma.user.deleteMany();
        await prisma.sweet.deleteMany();

        const authRes = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'inventory@sweets.com',
                password: 'password123',
            });
        token = authRes.body.token;

        // Create a sweet
        const sweet = await prisma.sweet.create({
            data: {
                name: 'Inventory Test Sweet',
                category: 'Test',
                price: 1.0,
                quantity: 10,
            },
        });
        sweetId = sweet.id;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe('POST /api/sweets/:id/purchase', () => {
        it('should purchase a sweet and decrease quantity', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${token}`)
                .send({ quantity: 2 });

            expect(res.status).toBe(200);
            expect(res.body.quantity).toBe(8);

            const updatedSweet = await prisma.sweet.findUnique({
                where: { id: sweetId },
            });
            expect(updatedSweet?.quantity).toBe(8);
        });

        it('should fail if insufficient quantity', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/purchase`)
                .set('Authorization', `Bearer ${token}`)
                .send({ quantity: 100 });

            expect(res.status).toBe(400);
            expect(res.body.message).toMatch(/insufficient/i);
        });
    });

    describe('POST /api/sweets/:id/restock', () => {
        it('should restock a sweet and increase quantity', async () => {
            const res = await request(app)
                .post(`/api/sweets/${sweetId}/restock`)
                .set('Authorization', `Bearer ${token}`)
                .send({ quantity: 50 });

            expect(res.status).toBe(200);
            expect(res.body.quantity).toBe(58); // 8 + 50
        });
    });
});
