import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSweets = async () => {
    return await prisma.sweet.findMany();
};

export const createSweet = async (data: any) => {
    return await prisma.sweet.create({ data });
};

export const searchSweets = async (query: string) => {
    return await prisma.sweet.findMany({
        where: {
            OR: [
                { name: { contains: query } },
                { category: { contains: query } },
            ],
        },
    });
};

export const updateSweet = async (id: string, data: any) => {
    return await prisma.sweet.update({
        where: { id },
        data,
    });
};

export const deleteSweet = async (id: string) => {
    return await prisma.sweet.delete({
        where: { id },
    });
};

export const purchaseSweet = async (id: string, quantity: number) => {
    return await prisma.$transaction(async (tx: any) => {
        const sweet = await tx.sweet.findUnique({ where: { id } });
        if (!sweet) throw new Error('Sweet not found');
        if (sweet.quantity < quantity) throw new Error('Insufficient quantity');

        return await tx.sweet.update({
            where: { id },
            data: { quantity: sweet.quantity - quantity },
        });
    });
};

export const restockSweet = async (id: string, quantity: number) => {
    return await prisma.sweet.update({
        where: { id },
        data: { quantity: { increment: quantity } },
    });
};
