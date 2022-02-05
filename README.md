# Storefront Backend Project

Online Storefront API created using

- Node/Express for the application logic

- jsonwebtoken from npm for working with JWTs

- Postgres for the database

- dotenv from npm for managing environment variables

- jasmine from npm for testing

- db-migrate from npm for migrations

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run
`yarn` or `npm install` in your terminal at the project root.

1- You Should create .env file in root with the following content

| Env Key             | Value                  | Descreption                                           |
| ------------------- | ---------------------- | ----------------------------------------------------- |
| SERVER_PORT         | 3000                   | Server port                                           |
| SERVER_HOST         | (server ip address)    | Server ip address                                     |
| DATABASE_HOST       | (db server ip address) | DB Server ip address                                  |
| DATABASE_PORT       | 5432                   | PG DB Default port                                    |
| DATABASE_NAME       | (db name)              | Development DB name                                   |
| DATABASE_TEST_NAME  | (test db name)         | Test DB name for testing                              |
| DATABASE_USER       | (DB User)              | User for accessing PG DB                              |
| DATABASE_PASSWORD   | (DB Password)          | Password for accessing PG DB                          |
| BCRYPT_PASSWORD     | string                 | Used by bcrypt to encrypt users password              |
| SALT_ROUNDS         | int default(10)        | Used by bcrypt to encrypt users password              |
| TOKEN_ACCESS_SECRET | string                 | Used by JWT to generate tokens                        |
| ENV                 | (dev or test)          | Used for switching between development and testing db |

2- create postgres database and change database.json with nessasry inforamtion

- To create postgres database using PSQL CLI

  `CREATE DATABASE db_name;`

- Create nessary user and priviages

  `CREATE ROLE db_user WITH PASSWORD 'password';`

  `GRANT ALL PRIVILEGES TO db_user ON DATABASE db_name;`

  `ULTER USER db_user CREATEDB;`

- Migrate to create nessacery tables:

  run `db-migrate up` in terminal.

## DATABASE SCHEMA

![StoreFront_DB_Schema](https://raw.githubusercontent.com/mma-90/Storefront/master/schema.PNG)

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

## API ROUTES

<details open>
    <summary> Users </summary>

- ### Get Users list

  return list of users, **JWT user token** is required.

  Path: `/users`

  Method: **_GET_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  > Response Example

  ```
  {
    "status": "success",
    "data": {
        "results": 3,
        "users": [
            {
                "id": 1,
                "username": "username1",
                "firstname": "firstname1",
                "lastname": "lastname1"
            },

            {
                "id": 2,
                "username": "username2",
                "firstname": "firstname2",
                "lastname": "lastname2"
            },
            {
                "id": 3,
                "username": "username3",
                "firstname": "firstname3",
                "lastname": "lastname3"
            }
        ]
    }
  }
  ```

- ### Create User

  create user

  Path: `/users`

  Method: **_POST_** / Status code : `201`

  #### URL Parameters, Queries and Body payload

  | Key         | Type   | Default | Required | Key Type | Description    |
  | ----------- | ------ | ------- | -------- | -------- | -------------- |
  | _username_  | string | -       | Yes      | Payload  | must be unique |
  | _firstname_ | string | -       | Yes      | Payload  | -              |
  | _lastname_  | string | -       | Yes      | Payload  | -              |
  | _password_  | string | -       | Yes      | Payload  | -              |

  > Examples

  `/user`
  create new user

  > Payload JSON Example

  ```
  {
    "username":"magdy",
    "firstname":"mohamed",
    "lastname":"magdy",
    "password":"password"
  }
  ```

  > Response Example

  ```
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYWdkeSIsImZpcnN0bmFtZSI6Im1vaGFtZWQiLCJsYXN0bmFtZSI6Im1hZ2R5IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJEFpWGlKRjFLNlFyT2o3ZzcxS3FFVC52U0FHb2NabUVuV0FXQjdad0N4RE1mQU9aTXZ3ZjZHIiwiaWF0IjoxNjQzOTAyMjY3LCJleHAiOjE2NDM5MzgyNjd9.s2wvt4KYWf9nZ1B27cS__pK00csQkd4RzGuWONHNnug"
  }
  ```

- ### Show user

  Get more information about user, **JWT user token** is required, User can show its profile.

  Path: `/users/:id`

  Method: **_get_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/users/1`
  return user with id: 1, user token must have access to resource.

  > Response Example

  ```
  {
    "status": "success",
    "user": {
        "id": 1,
        "username": "magdy",
        "firstname": "mohamed",
        "lastname": "magdy",
        "password_digest": "$2b$10$AiXiJF1K6QrOj7g71KqET.vSAGocZmEnWAWB7ZwCxDMfAOZMvwf6G",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYWdkeSIsImZpcnN0bmFtZSI6Im1vaGFtZWQiLCJsYXN0bmFtZSI6Im1hZ2R5IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJEFpWGlKRjFLNlFyT2o3ZzcxS3FFVC52U0FHb2NabUVuV0FXQjdad0N4RE1mQU9aTXZ3ZjZHIiwiaWF0IjoxNjQzOTAyMjY3LCJleHAiOjE2NDM5MzgyNjd9.s2wvt4KYWf9nZ1B27cS__pK00csQkd4RzGuWONHNnug"
    }
  }
  ```

- ### Delete User

  delete user, **JWT user token** is required, User can delete its profile.

  Path: `/users/:id`

  Method: **_delete_** / Status code : `204`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/users/1`
  return user with id: 1, user token must have access to resource.

- ### login

  return user token it exist and credentials are correct.

  Path: `/users/login`

  Method: **_post_** / Status code : `200`

  #### URL Parameters, Queries and Body payload

  | Key        | Type   | Default | Required | Key Type | Description |
  | ---------- | ------ | ------- | -------- | -------- | ----------- |
  | _username_ | string | -       | Yes      | Payload  | -           |
  | _password_ | string | -       | Yes      | Payload  | -           |

  > Examples

  `/users/login`

  > Payload JSON Example

  ```
  {
    "username":"magdy",
    "password":"password"
  }
  ```

  > Response Example

  ```
  {
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtYWdkeSIsImZpcnN0bmFtZSI6Im1vaGFtZWQiLCJsYXN0bmFtZSI6Im1hZ2R5IiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJEFpWGlKRjFLNlFyT2o3ZzcxS3FFVC52U0FHb2NabUVuV0FXQjdad0N4RE1mQU9aTXZ3ZjZHIiwiaWF0IjoxNjQzOTA5ODkyLCJleHAiOjE2NDM5NDU4OTJ9.k9jpqVeAN5zT4Luq2A8bhpmL1lgUKqdXV4E0p6VS_sY"
  }
  ```

</details>

<details>
  <summary> Categories </summary>

- ### Get Categories list

  Get List of categories.

  Path: `/categories`

  Method: **_GET_** / Status code : `200`

  > Examples

  `/categories`
  list all categories.

  > Response Example

  ```

  {
  "status": "success",
  "data": {
  "results": 3,
  "categories": [
  {
  "id": 1,
  "name": "cat 1"
  },
  {
  "id": 2,
  "name": "cat 2"
  },
  {
  "id": 3,
  "name": "cat 3"
  }
  ]
  }

  ```

- ### Create Category

  create category, **JWT user token** is required.

  Path: `/categories`

  Method: **_POST_** / Status code : `201`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key    | Type   | Default | Required | Key Type | Description    |
  | ------ | ------ | ------- | -------- | -------- | -------------- |
  | _name_ | string | -       | Yes      | Payload  | must be unique |

  > Examples

  `/categories`
  create category from json, need jwt user token.

  > Payload JSON Example

  ```

  {
  "name": "category1"
  }

  ```

  > Response Example

  ```

  {
  "status": "success",
  "category": {
  "id": 1,
  "name": "category1"
  }
  }

  ```

- ### Show Category

  Path: `/categories/:id`

  Method: **_get_** / Status code : `200`

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/categories/1`
  return category with id: 1.

  > Response Example

  ```

  {
  "status": "success",
  "category": {
  "id": 1,
  "name": "category1"
  }
  }

  ```

- ### Delete Category

  Delete Category, **JWT user token** is required.

  Path: `/categories/:id`

  Method: **_delete_** / Status code : `204`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/categories/1`
  delete category with id 1.

- ### Update Category

  update category name, **JWT user token** is required.

  Path: `/categories/:id`

  Method: **_patch_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### URL Parameters, Queries and Body payload

  | Key    | Type   | Default | Required | Key Type      | Description    |
  | ------ | ------ | ------- | -------- | ------------- | -------------- |
  | _id_   | int    | -       | Yes      | URL Parameter | must be > 0    |
  | _name_ | string | -       | Yes      | Payload       | must be unique |

  > Examples

  `/categories/1` update category with id 1 .

  > Payload JSON Example

  ```

  {
  "name": "newCategoryName"
  }

  ```

  > Response Example

  ```

  {
  "status": "success",
  "category": {
  "id": 1,
  "name": "category1"
  }
  }

  ```

</details>

<details>
<summary> Products </summary>

- ### Get Products list

  get products list.

  Path: `/products`

  Method: **_GET_** / Status code : `200`

  > Examples

  `/products`
  get list of products.

  > Response Example

  ```
  {
  "status": "success",
      "data": {
          "results": 2,
          "products": [
              {
                  "id": 1,
                  "name": "product 1",
                  "price": 100,
                  "category_id": 1
              },
              {
                  "id": 2,
                  "name": "product 2",
                  "price": 19,
                  "category_id": 1
              }
          ]
      }
  }
  ```

- ### Create Product

create empty Product, **JWT user token** is required.

Path: `/products`

Method: **_POST_** / Status code : `201`

#### Header

| Key           | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |

#### URL Parameters, Queries and Body payload

| Key         | Type   | Default | Required | Key Type | Description                     |
| ----------- | ------ | ------- | -------- | -------- | ------------------------------- |
| _name_      | string | -       | Yes      | Payload  | Product name                    |
| _price_     | int    | -       | Yes      | Payload  | Product price, must > 0         |
| category_id | int    | -       | Yes      | Payload  | Existing Category id , must > 0 |

> Examples

`/products`
create new product.

> Payload JSON Example

````

{
"name": "Product 1",
"price": 55,
"category_id": 1
}

```

> Response Example

```

{
"status": "success",
"product": {
"id": 12,
"name": "product 1",
"price": 55,
"category_id": 1
}
}

```

- ### Show Product

Path: `/products/:id`

Method: **_get_** / Status code : `200`

#### URL Parameters, Queries and Body payload

| Key Type  | Key  | Type | Default | Required | Key Type | in payload | Description |
| --------- | ---- | ---- | ------- | -------- | ------ | ------- | ----------- |
| parameter | _id_ | int  | -       | Yes      | Yes    | No      | must be > 0 |

> Examples

`/products/1`
return product with id 1.

> Response Example

```

{
"status": "success",
"product": {
"id": 1,
"name": "product 1",
"price": 100,
"category_id": 1
}
}

```

- ### Delete Product

delete product, **JWT user token is required**.

Path: `/products/:id`

Method: **_delete_** / Status code : `204`

#### Header

| Key           | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |

#### URL Parameters, Queries and Body payload

| Key Type  | Key  | Type | Default | Required | Key Type | in payload | Description |
| --------- | ---- | ---- | ------- | -------- | ------ | ------- | ----------- |
| parameter | _id_ | int  | -       | Yes      | Yes    | No      | must be > 0 |

> Examples

`/products/1`
delete product id: 1.

- ### Update Product

update product name, price & category, **JWT user token is required**.

Path: `/products/:id`

Method: **_patch_** / Status code : `200`

#### Header

| Key           | Value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |
| Content-Type  | application/json           |

#### URL Parameters, Queries and Body payload

| Key Type | Key         | Type   | Default | Required | Key Type | in payload | Description                     |
| -------- | ----------- | ------ | ------- | -------- | ------ | ------- | ------------------------------- |
| payload     | _name_      | string | -       | Optional | No     | Yes     | Product name                    |
| payload     | _price_     | int    | -       | Optional | No     | Yes     | Product price, must > 0         |
| payload     | category_id | int    | -       | Optional | No     | Yes     | Existing Category id , must > 0 |

> Examples

`/products/1`
update product with id 1.

> Payload JSON Example

```

{
"name": "new product 1",
"price": 105,
"category_id": 2
}

```

> Response Example

```

{
"status": "success",
"product": {
"id": 3,
"name": "new product 1",
"price": 105,
"category_id": 2
}
}

````

</details>
<details>
  <summary> Orders </summary>

- ### Get Orders list

  getting list of active and completed orders, **JWT user token** is required.

  Path: `/orders`

  Method: **_GET_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key      | Type   | Default | Required | Key Type  | Description                  |
  | -------- | ------ | ------- | -------- | --------- | ---------------------------- |
  | _status_ | string | -       | No       | URL Query | must be (active or complete) |

  > Examples

  `/orders`
  list of active and completed orders that related to user.

  `/orders/?status=complete`
  list of completed orders that related to user.

  `/orders/?status=active`
  list of active orders that related to user.

  > Response Example

  ```
  {
      "status": "success",
      "data": {
          "results": 2,
          "orders": [
              {
                  "id": 1,
                  "status": "complete",
                  "user_id": 1
              },
              {
                  "id": 2,
                  "status": "active",
                  "user_id": 1
              }
          ]
      }
  }
  ```

- ### Create Order

  create empty order, **JWT user token** is required.

  Path: `/orders`

  Method: **_POST_** / Status code : `201`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  > Examples

  `/orders`
  list of active and completed orders that related to user.

  > Response Example

  ```
  {
  "status": "success",
  "order": {
  "id": 1,
  "status": "active",
  "user_id": 1
  }
  }

  ```

- ### Show Order

  show order that related to jwt user with products list that in it, **JWT user token** is required.

  Path: `/orders/:id`

  Method: **_get_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/orders/1`
  return order with products.

  > Response Example

  ```

  {
  "status": "success",
  "order": {
  "id": 5,
  "status": "active",
  "user_id": 1
  },
  "cart": [
  {
  "product_id": 1,
  "name": "product 1",
  "quantity": 6
  },
  {
  "product_id": 2,
  "name": "product 2",
  "quantity": 6
  }
  ]
  }

  ```

- ### Delete Order

  delete order that related to jwt user, **JWT user token** is required.
  Path: `/orders/:id`

  Method: **_delete_** / Status code : `204`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### URL Parameters, Queries and Body payload

  | Key  | Type | Default | Required | Key Type      | Description |
  | ---- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_ | int  | -       | Yes      | URL Parameter | must be > 0 |

  > Examples

  `/orders/1`
  delete order with products.

- ### Update Order

  change order status from active to complete( allowed if order have products)
  or change from complete to active, **JWT user token** is required.

  Path: `/orders/:id`

  Method: **_patch_** / Status code : `200`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### URL Parameters, Queries and Body payload

  | Key      | Type   | Default | Required | Key Type       | Description                  |
  | -------- | ------ | ------- | -------- | -------------- | ---------------------------- |
  | _id_     | int    | -       | Yes      | URL Paramerter | must be > 0                  |
  | _status_ | string | -       | Yes      | Payload        | must be (active or complete) |

  > Examples

  `/orders/1`
  return order with products.

  > Payload JSON Example

  ```
  {
  "status": "complete"
  }
  ```

  > Response Example

  ```
  {
  "status": "success",
  "order": {
  "id": 5,
  "status": "complete",
  "user_id": 1
  },
  "cart": [
  {
  "product_id": 1,
  "name": "product 1",
  "quantity": 6
  },
  {
  "product_id": 2,
  "name": "product 2",
  "quantity": 6
  }
  ]
  }

  ```

- ### Add Product to Active Order (add to cart)

  adding product to active order, **JWT user token** is required.

  Path: `/orders/:id/products`

  Method: **_post_** / Status code : `201`

  #### Header

  | Key           | Value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### URL Parameters, Queries and Body payload

  | Key        | Type | Default | Required | Key Type      | Description |
  | ---------- | ---- | ------- | -------- | ------------- | ----------- |
  | _id_       | int  | -       | Yes      | URL Parameter | must be > 0 |
  | product_id | int  | -       | Yes      | Payload       | must be > 0 |
  | quantity   | int  | -       | Yes      | Payload       | must be > 0 |

  > Examples

  `/orders/1/products`
  add product json to order.

  > Payload JSON Example

  ```

  {
  "quantity": 6,
  "product_id" :5
  }

  ```

  > Response Example

  ```

  {
  "status": "success",
  "cart": {
  "order": {
  "id": 1,
  "status": "active",
  "user_id": 1
  },
  "products": [
  {
  "product_id": 5,
  "name": "product 5",
  "quantity": 6
  }
  ]
  }
  }

  ```

</details>

<details>
  <summary> Dashboard </summary>

- ### Popular Products

  Get most popular products

  Path: `/dashboard/products/popular/`

  Method: **_get_** / Status code : `200`

  #### URL Parameters, Queries and Body payload

  | Key   | Type   | Default | Required | Key Type  | Description           |
  | ----- | ------ | ------- | -------- | --------- | --------------------- |
  | sort  | string | 'desc'  | Optional | URL Query | must be (asc or desc) |
  | limit | int    | 5       | Optional | URL Query | must be > 0           |

  > Examples

  `/dashboard/products/popular/?sort=desc&limit=5`
  get top five popular products with desc order

  > Response Example

  ```

  {
  "status": "success",
  "data": {
  "results": 5,
  "products": [
  {
  "product_id": 9,
  "count": "10"
  },
  {
  "product_id": 3,
  "count": "5"
  },
  {
  "product_id": 4,
  "count": "3"
  },
  {
  "product_id": 2,
  "count": "2"
  },
  {
  "product_id": 1,
  "count": "1"
  }
  ]
  }
  }

  ```

- ### Products with category

  Get list of products with specific category

  Path: `dashboard/products/category/:id`

  Method: **_get_** / Status code : `200`

  #### URL Parameters, Queries and Body payload

  | Key | Type | Default | Required | Key Type      | Description             |
  | --- | ---- | ------- | -------- | ------------- | ----------------------- |
  | id  | int  | -       | Yes      | URL Parameter | category id must be > 0 |

  > Examples

  `dashboard/products/category/1`
  return products list which category id 1

  > Response Example

  ```

  {
  "status": "success",
  "data": {
  "results": 4,
  "products": [
  {
  "id": 2,
  "name": "product 2",
  "price": 19,
  "category_name": "category1"
  },
  {
  "id": 10,
  "name": "cat1",
  "price": 55,
  "category_name": "category1"
  },
  {
  "id": 11,
  "name": "product 1",
  "price": 55,
  "category_name": "category1"
  },
  {
  "id": 12,
  "name": "product 1",
  "price": 55,
  "category_name": "category1"
  }
  ]
  }
  }

  ```

</details>
