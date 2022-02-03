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

## API Resources

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
<!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
<details>
  <summary> Products </summary>
   
- ### Get Products list

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

  create empty Product

  Path: `/products`

  Method: **_POST_** / Status code : `201`

  #### Header

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### Parameters, Body & Queries

  | Key Type | key         | Type   | Default | Required | in URL | in Body | Description                     |
  | -------- | ----------- | ------ | ------- | -------- | ------ | ------- | ------------------------------- |
  | body     | _name_      | string | -       | Yes      | No     | Yes     | Product name                    |
  | body     | _price_     | int    | -       | Yes      | No     | Yes     | Product price, must > 0         |
  | body     | category_id | int    | -       | Yes      | No     | Yes     | Existing Category id , must > 0 |

  > Examples

  `/products`
  create new product.

  > Payload JSON Example

  ```
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

  #### Parameters, Body & Queries

  | Key Type  | key  | Type | Default | Required | in URL | in Body | Description |
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

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |

  #### Parameters, Body & Queries

  | Key Type  | key  | Type | Default | Required | in URL | in Body | Description |
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

  | key           | value                      |
  | ------------- | -------------------------- |
  | Authorization | Bearer < **_JWT token_** > |
  | Content-Type  | application/json           |

  #### Parameters, Body & Queries

  | Key Type | key         | Type   | Default | Required | in URL | in Body | Description                     |
  | -------- | ----------- | ------ | ------- | -------- | ------ | ------- | ------------------------------- |
  | body     | _name_      | string | -       | Optional | No     | Yes     | Product name                    |
  | body     | _price_     | int    | -       | Optional | No     | Yes     | Product price, must > 0         |
  | body     | category_id | int    | -       | Optional | No     | Yes     | Existing Category id , must > 0 |

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
  ```

</details>
<!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
<details>
    <summary> Users </summary>
</details>
<!-- ------------------------------------------------------------------------------------------------------------------------------------------- -->
<details>
    <summary> Categories </summary>

- ### Get Categories list

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

create category

Path: `/categories`

Method: **_POST_** / Status code : `201`

#### Header

| key           | value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |

#### Parameters, Body & Queries

| Key Type | key    | Type   | Default | Required | in URL | in Body | Description    |
| -------- | ------ | ------ | ------- | -------- | ------ | ------- | -------------- |
| body     | _name_ | string | -       | Yes      | No     | Yes     | must be unique |

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

#### Parameters, Body & Queries

| Key Type  | key  | Type | Default | Required | in URL | in Body | Description |
| --------- | ---- | ---- | ------- | -------- | ------ | ------- | ----------- |
| parameter | _id_ | int  | -       | Yes      | Yes    | No      | must be > 0 |

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

delete Category, JWT user token required.
Path: `/categories/:id`

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

`/categories/1`
delete category with id 1.

- ### Update Category

update category name

Path: `/categories/:id`

Method: **_patch_** / Status code : `200`

#### Header

| key           | value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |
| Content-Type  | application/json           |

#### Parameters, Body & Queries

| Key Type  | key    | Type   | Default | Required | in URL | in Body | Description    |
| --------- | ------ | ------ | ------- | -------- | ------ | ------- | -------------- |
| parameter | _id_   | int    | -       | Yes      | Yes    | No      | must be > 0    |
| body      | _name_ | string | -       | Yes      | No     | Yes     | must be unique |

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
```
