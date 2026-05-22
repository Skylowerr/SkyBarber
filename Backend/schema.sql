-- Kullanıcılar Tablosu (Müşteri ve Admin rolleri ile)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hizmetler Tablosu (CRUD, Arama ve Sıralama için)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test amaçlı varsayılan admin kullanıcısı (Şifre: admin123)
-- bcrypt ile hashlenmiş hali: $2b$10$wK1m1oXzR6HNE... (İleride kayıt ol kısmından da açabilirsin)