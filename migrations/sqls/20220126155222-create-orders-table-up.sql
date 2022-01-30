CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status order_status NOT NULL,    
    user_id BIGINT REFERENCES users(id)
);