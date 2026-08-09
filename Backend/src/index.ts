import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import serviceRoutes from './routes/service.routes';
import appointmentRoutes from './routes/appointment.routes'; // <-- Eklendi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Ayarları
app.use(cors({
    origin: ['https://skybarber-web.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json()); // req.body'nin okunabilmesi için en kritik satır!
app.use(express.urlencoded({ extended: true }));

// Rotaları Tanımlama
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes); // <-- Eklendi

// Sunucuyu Başlatma
// SADECE BİLGİSAYARINDA ÇALIŞIRKEN PORTU DİNLE
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Sunucu ${PORT} portunda aktif kanka!`);
    });
}

// VERCEL İÇİN UYGULAMAYI DIŞARI AKTAR
export default app;