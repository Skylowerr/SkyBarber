import { Request, Response } from 'express';
import { pool } from '../config/database';

// Arama (Search) ve Sıralama (Sort) destekli listeleme
export const getServices = async (req: Request, res: Response) => {
    const { search, sortBy } = req.query;
    let queryText = 'SELECT * FROM services WHERE 1=1';
    const queryParams: any[] = [];

    if (search) {
        queryParams.push(`%${search}%`);
        queryText += ` AND name ILIKE $${queryParams.length}`;
    }

    if (sortBy === 'price_asc') queryText += ' ORDER BY price ASC';
    else if (sortBy === 'price_desc') queryText += ' ORDER BY price DESC';
    else queryText += ' ORDER BY id DESC';

    try {
        const result = await pool.query(queryText, queryParams);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Hizmetler getirilirken hata oluştu.' });
    }
};

export const createService = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    try {
        const result = await pool.query('INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Hizmet eklenemedi.' });
    }
};

export const updateService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const result = await pool.query('UPDATE services SET name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Hizmet güncellenemedi.' });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM services WHERE id = $1', [id]);
        res.json({ message: 'Hizmet başarıyla silindi.' });
    } catch (err) {
        res.status(500).json({ error: 'Hizmet silinemedi.' });
    }
};