import { z } from 'zod';

export const createSweetSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    price: z.number().min(0, 'Price must be positive'),
    quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
    description: z.string().optional(),
    imageUrl: z.string().url().optional(),
});

export const updateSweetSchema = createSweetSchema.partial();
