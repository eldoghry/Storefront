CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);