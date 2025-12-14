
import { Request, Response } from 'express';
import { createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } from '../services/sweets.service';

export const create = async (req: Request, res: Response) => {
    try {
        const sweet = await createSweet(req.body);
        res.status(201).json(sweet);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
        const sweets = await getAllSweets();
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const search = async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string;
        const sweets = await searchSweets(query || '');
        res.status(200).json(sweets);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sweet = await updateSweet(id, req.body);
        res.status(200).json(sweet);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteSweet(id);
        res.status(200).json({ message: 'Sweet deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const purchase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const sweet = await purchaseSweet(id, Number(quantity));
        res.status(200).json(sweet);
    } catch (error: any) {
        if (error.message === 'Insufficient quantity') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export const restock = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const sweet = await restockSweet(id, Number(quantity));
        res.status(200).json(sweet);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
