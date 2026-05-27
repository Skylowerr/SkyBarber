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
// Backend/src/controllers/service.controller.ts içindeki createService kısmını bu kodla değiştir:
export const createService = async (req: Request, res: Response) => {
    const { name, price } = req.body;
    try {
        // 1. Gelen verilerin doğruluğunu kontrol et
        if (!name || !price) {
            return res.status(400).json({ error: 'Hizmet adı ve fiyatı alanları zorunludur.' });
        }

        // 2. Firebase için benzersiz bir doküman referansı oluştur
        const newServiceRef = db.collection('services').doc();
        
        const serviceData = {
            id: newServiceRef.id, // Kolay silme/düzenleme için ID'yi içine ekliyoruz
            name: String(name).trim(),
            price: Number(price),  // Kesinlikle sayı formatına çeviriyoruz
            created_at: new Date().toISOString()
        };

        // 3. Veriyi Firestore'a kaydet
        await newServiceRef.set(serviceData);

        // 4. Başarılı sonucu frontend'e fırlat
        return res.status(201).json(serviceData);

    } catch (err: any) {
        // Hatanın ne olduğunu VS Code terminalinde görebilmek için logluyoruz
        console.error("Firebase Hizmet Ekleme Hatası:", err);
        return res.status(500).json({ error: 'Firebase veri yazma hatası: ' + err.message });
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