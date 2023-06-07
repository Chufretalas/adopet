ALTER TABLE
    users DROP COLUMN phone_number;

ALTER TABLE
    users DROP COLUMN city;

ALTER TABLE
    profiles
ADD
    COLUMN phone_number VARCHAR(50);

ALTER TABLE
    profiles
ADD
    COLUMN city VARCHAR(50);