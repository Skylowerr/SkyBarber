import { Request, Response } from 'express';
import { db } from '../config/database';

// Arama ve Sıralama Destekli Listeleme (Read)
export const getServices = async (req: Request, res: Response) => {
    const { search, sortBy } = req.query;
    try {
        const servicesRef = db.collection('services');
        const snapshot = await servicesRef.get();
        
        let servicesList: any[] = [];
        snapshot.forEach(doc => {
            servicesList.push({ id: doc.id, ...doc.data() });
        });

        // 1. Arama Filtresi (Search): İsim eşleşmesine göre yerel filtreleme
        if (search) {
            const term = String(search).toLowerCase();
            servicesList = servicesList.filter(s => s.name && s.name.toLowerCase().includes(term));
        }

        // 2. Sıralama Filtresi (Sort): Fiyata göre sıralama
        if (sortBy === 'price_asc') {
            servicesList.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            servicesList.sort((a, b) => b.price - a.price);
        } else {
            // Varsayılan olarak en son eklenenden ilk eklenene sırala
            servicesList.sort((a, b) => b.created_at.localeCompare(a.created_at));
        }

        res.json(servicesList);
    } catch (err) {
        console.error("Hizmet Listeleme Hatası:", err);
        res.status(500).json({ error: 'Hizmetler getirilirken hata oluştu.' });
    }
};

// Yeni Hizmet Oluşturma (Create)
export const createService = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    try {
        const newServiceRef = db.collection('services').doc();
        const serviceData = {
            name,
            price: Number(price),
            created_at: new Date().toISOString()
        };

        await newServiceRef.set(serviceData);
        res.status(201).json({ id: newServiceRef.id, ...serviceData });
    } catch (err) {
        res.status(500).json({ error: 'Hizmet eklenemedi.' });
    }
};

// Hizmet Güncelleme (Update)
export const updateService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const serviceRef = db.collection('services').doc(id);
        await serviceRef.update({
            name,
            price: Number(price)
        });
        res.json({ id, name, price });
    } catch (err) {
        res.status(500).json({ error: 'Hizmet güncellenemedi.' });
    }
};

// Hizmet Silme (Delete)
export const deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const serviceRef = db.collection('services').doc(id);
        await serviceRef.delete();
        res.json({ message: 'Hizmet başarıyla silindi.' });
    } catch (err) {
        res.status(500).json({ error: 'Hizmet silinemedi.' });
    }
};