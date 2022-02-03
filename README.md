# Storefront Backend Project

API created using

- Node/Express for the application logic

- jsonwebtoken from npm for working with JWTs

- Postgres for the database

- dotenv from npm for managing environment variables

- jasmine from npm for testing

- db-migrate from npm for migrations

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run
`yarn` or `npm install` in your terminal at the project root.

- create postgres database and change database.json with nessasry inforamtion

  - To create postgres database using PSQL CLI

    `CREATE DATABASE db_name;`

  - Create nessary user and priviages

    `CREATE ROLE db_user WITH PASSWORD 'password';`

    `GRANT ALL PRIVILEGES TO db_user ON DATABASE db_name;`

- Migrate to create nessacery tables:

  run `db-migrate up` in terminal.

<details>
<summary> Orders </summary>
  
- ### Get Orders list

    Path: `/orders`

    Method: **_GET_** / Status code : `200`

    #### Header

    | key           | value                      |
    | ------------- | -------------------------- |
    | Authorization | Bearer < **_JWT token_** > |
    | Content-Type  | application/json           |

    #### Parameters, Body & Queries

    | Key Type | key      | Type   | Default | Required | in URL | in Body | Description                  |
    | -------- | -------- | ------ | ------- | -------- | ------ | ------- | ---------------------------- |
    | query    | _status_ | string | -       | No       | Yes    | No      | must be (active or complete) |

    > Examples

    `/orders`
    list of active and completed orders that related to user.

    `/orders/?status=complete`
    list of completed orders that related to user.

    `/orders/?status=active`
    list of active orders that related to user.

    > Return Example

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

  create empty order

  Path: `/orders`

  Method: **_POST_** / Status code : `201`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  > Examples

  `/orders`
  list of active and completed orders that related to user.

  > Return Example

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

  show order that related to jwt user with products list that in it.
  Path: `/orders/:id`

  Method: **_get_** / Status code : `200`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### Parameters, Body & Queries

  | Key Type  | key  | Type | Default | Required | in URL | in Body | Description |
  | --------- | ---- | ---- | ------- | -------- | ------ | ------- | ----------- |
  | parameter | _id_ | int  | -       | Yes      | Yes    | No      | must be > 0 |

  > Examples

  `/orders/1`
  return order with products.

  > Return Example

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

  delete order that related to jwt user.
  Path: `/orders/:id`

  Method: **_delete_** / Status code : `204`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### Parameters, Body & Queries

  | Key Type  | key  | Type | Default | Required | in URL | in Body | Description |
  | --------- | ---- | ---- | ------- | -------- | ------ | ------- | ----------- |
  | parameter | _id_ | int  | -       | Yes      | Yes    | No      | must be > 0 |

  > Examples

  `/orders/1`
  delete order with products.

- ### Update Order

  change order status from active to complete( allowed if order have products)
  or change from complete to active

  Path: `/orders/:id`

  Method: **_patch_** / Status code : `200`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### Parameters, Body & Queries

  | Key Type  | key      | Type   | Default | Required | in URL | in Body | Description                  |
  | --------- | -------- | ------ | ------- | -------- | ------ | ------- | ---------------------------- |
  | parameter | _id_     | int    | -       | Yes      | Yes    | No      | must be > 0                  |
  | body      | _status_ | string | -       | Yes      | No     | Yes     | must be (active or complete) |

  > Examples

  `/orders/1`
  return order with products.

  > Return Example

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

  adding product to active order

  Path: `/orders/:id/products`

  Method: **_post_** / Status code : `201`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### Parameters, Body & Queries

  | Key Type  | key        | Type | Default | Required | in URL | in Body | Description |
  | --------- | ---------- | ---- | ------- | -------- | ------ | ------- | ----------- |
  | parameter | _id_       | int  | -       | Yes      | Yes    | No      | must be > 0 |
  | body      | product_id | int  | -       | Yes      | No     | Yes     | must be > 0 |
  | body      | quantity   | int  | -       | Yes      | No     | Yes     | must be > 0 |

  > Examples

  `/orders/1/products`
  add product json to order.

  Body json example

  ```
  {
    "quantity": 6,
    "product_id" :5
  }
  ```

  > Return Example

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
  <summary> Users </summary>
</details>

<details>
  <summary> Categories </summary>
</details>
