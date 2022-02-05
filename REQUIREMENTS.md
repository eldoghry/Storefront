## Data Schema Shapes

#### Users Table

- id (INTEGER) Primary Key
- username (VARCHAR(50))
- firstName (VARCHAR(50))
- lastName (VARCHAR(50))
- password_digest (text)

#### Categories Table

- id (INTEGER) Primary Key
- name (VARCHAR(50))

#### Products Table

- id (INTEGER) Primary Key
- name (VARCHAR(50))
- price (INTEGER)
- category_id (INTEGER) Foreign Key (Categories Table)

#### Orders Table

- id Primary Key
- user_id (INTEGER) Foreign Key (Users Table)
- status (active or complete)

#### Order_products Table

- id (INTEGER) Primary Key
- quantity (INTEGER)
- order_id (INTEGER) Foreign Key (Orders Table)
- product_id (INTEGER) Foreign Key (Products Table)
