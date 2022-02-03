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

## Orders

#### Get Orders list

Path: `/orders`
Method: **_GET_**
status code : `200`

> Header

| key           | value                      |
| ------------- | -------------------------- |
| Authorization | Bearer < **_JWT token_** > |
| Content-Type  | application/json           |

> Parameters & Queries

| key      | Type   | Default | Required | Description                  |
| -------- | ------ | ------- | -------- | ---------------------------- |
| _status_ | string | **-**   | No       | must be (active or complete) |

> Examples

    - `/orders` list of active and completed orders that related to user
    - `/orders/?status=complete` list of completed orders that related to user
    -`/orders/?status=active` list of active orders that related to user
