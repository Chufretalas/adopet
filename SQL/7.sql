DROP TABLE messages;

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) ON DELETE SET NULL,
    receiver_id INT REFERENCES users(id) ON DELETE SET NULL,
    pet_id INT REFERENCES pets(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);