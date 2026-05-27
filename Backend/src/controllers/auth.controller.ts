import { Request, Response } from 'express';
import { db } from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    try {
        const usersRef = db.collection('users');
        
        // E-posta daha önce alınmış mı kontrol et
        const snapshot = await usersRef.where('email', '==', email).get();
        if (!snapshot.empty) {
            return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanımda.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Yeni kullanıcı dokümanı oluştur
        const newUserRef = usersRef.doc();
        const userData = {
            id: newUserRef.id,
            email,
            password: hashedPassword,
            role: role || 'customer',
            created_at: new Date().toISOString()
        };

        await newUserRef.set(userData);

        res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi.', user: { email, role: userData.role } });
    } catch (err: any) {
        console.error("Firebase Kayıt Hatası:", err);
        res.status(500).json({ error: 'Kayıt esnasında bir sunucu hatası oluştu.' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).get();

        if (snapshot.empty) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        // İlk eşleşen kullanıcıyı al
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '1d' }
        );

        res.json({ token, role: user.role, email: user.email });
    } catch (err) {
        console.error("Firebase Giriş Hatası:", err);
        res.status(500).json({ error: 'Giriş yapılırken bir sunucu hatası oluştu.' });
    }
};