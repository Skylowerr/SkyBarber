-- SkyBarber Relational Database Backup Script (Alternative Schema)
-- Database Target: PostgreSQL / MySQL

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(255) PRIMARY KEY,
    service_id VARCHAR(255),
    service_name VARCHAR(255),
    price INT,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(10) NOT NULL,
    customer_email VARCHAR(255),
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_email) REFERENCES users(email)
);

-- Insert Sample Mock Data for Testing Purposes
INSERT INTO services (id, name, price) VALUES ('srv_01', 'Haircut & Wash', 250);
INSERT INTO services (id, name, price) VALUES ('srv_02', 'Beard Shaving', 150);