import { Request, Response } from 'express';
import { db } from '../config/database';

// 1. Yeni Randevu Oluşturma (Create)
export const createAppointment = async (req: Request, res: Response) => {
    const { serviceId, serviceName, price, date, time, customerEmail } = req.body;

    try {
        if (!serviceId || !date || !time || !customerEmail) {
            return res.status(400).json({ error: 'Tüm alanların doldurulması zorunludur.' });
        }

        const appointmentsRef = db.collection('appointments');

        // Aynı gün ve aynı saatte başka randevu var mı kontrolü
        const checkConflict = await appointmentsRef
            .where('date', '==', date)
            .where('time', '==', time)
            .get();

        if (!checkConflict.empty) {
            return res.status(400).json({ error: 'Seçtiğiniz gün ve saatte berberimiz doludur. Lütfen başka bir saat seçin.' });
        }

        const newAppointmentRef = appointmentsRef.doc();
        const appointmentData = {
            id: newAppointmentRef.id,
            serviceId,
            serviceName,
            price: Number(price),
            date, // Örn: "2026-05-28"
            time, // Örn: "14:00"
            customerEmail,
            status: 'confirmed',
            created_at: new Date().toISOString()
        };

        await newAppointmentRef.set(appointmentData);
        res.status(201).json({ message: 'Randevunuz başarıyla onaylandı!', appointment: appointmentData });

    } catch (err: any) {
        console.error("Randevu Oluşturma Hatası:", err);
        res.status(500).json({ error: 'Randevu kaydedilirken bir hata oluştu.' });
    }
};

// 2. Dolu Saatleri Getirme (Müsaitlik Kontrolü İçin)
export const getOccupiedTimes = async (req: Request, res: Response) => {
    const { date } = req.query;
    try {
        if (!date) return res.status(400).json({ error: 'Tarih parametresi gereklidir.' });

        const snapshot = await db.collection('appointments').where('date', '==', date).get();
        const occupiedTimes: string[] = [];
        
        snapshot.forEach(doc => {
            occupiedTimes.push(doc.data().time);
        });

        res.json(occupiedTimes); // Örn: ["10:00", "14:00"] -> Bu saatler arayüzde kilitlenecek
    } catch (err) {
        res.status(500).json({ error: 'Dolu saatler getirilemedi.' });
    }
};

// 3. Giriş Yapmış Kullanıcının Randevularını Getirme (Read)
export const getMyAppointments = async (req: Request, res: Response) => {
    const { email } = req.query;
    try {
        if (!email) return res.status(400).json({ error: 'E-posta parametresi zorunludur.' });

        const snapshot = await db.collection('appointments')
            .where('customerEmail', '==', String(email))
            .get();

        const list: any[] = [];
        snapshot.forEach(doc => {
            list.push({ id: doc.id, ...doc.data() });
        });

        // Tarih ve saate göre sırala (En yakın randevu en üstte)
        list.sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

        res.json(list);
    } catch (err) {
        res.status(500).json({ error: 'Randevularınız listelenirken hata oluşti.' });
    }
};

// 4. Randevu İptal Etme (Delete)
export const cancelAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await db.collection('appointments').doc(id).delete();
        res.json({ message: 'Randevu başarıyla iptal edildi.' });
    } catch (err) {
        res.status(500).json({ error: 'Randevu iptal edilemedi.' });
    }
};