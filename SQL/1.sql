CREATE TYPE user_role AS ENUM ('owner', 'adopter');
CREATE TYPE pet_size AS ENUM ('small', 'medium/small', 'medium', 'medium/large', 'large', 'very big');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name varchar(120) NOT NULL,
    email varchar(90) NOT NULL,
    password varchar(255) NOT NULL,
    role user_role NOT NULL,
    phone_number VARCHAR(50),
    city VARCHAR(50),
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pets (
    id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    days_old INT NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    size pet_size NOT NULL,
    personality VARCHAR(100),
    photo_url VARCHAR(255),
    available BOOLEAN DEFAULT TRUE NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE SET NULL,
    receiver_id INT REFERENCES users(id) ON DELETE SET NULL,
    sender_name VARCHAR(120) NOT NULL,
    sender_phone_number VARCHAR(50) NOT NULL,
    pet_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    photo_url VARCHAR(255),
    about TEXT,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);