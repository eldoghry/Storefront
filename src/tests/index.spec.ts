import supertest from 'supertest';
import app from './../server';
import client from '../database';

//importing models
import userModel from './model/user.spec';
import categoryModel from './model/category.spec';
import productModel from './model/product.spec';
import orderModel from './model/order.spec';

//importing routes
import userRoutes from './route/user.spec';
import categoryRoutes from './route/category.spec';
import productRoutes from './route/product.spec';
import orderRoutes from './route/order.spec';
import dashboardRoutes from './route/dashboard.spec';

const request = supertest(app);

describe('MODEL TESTING', () => {
  userModel();
  categoryModel();
  productModel();
  orderModel();
});

describe('ENDPOINT TESTING', () => {
  beforeAll(async () => {
    //reseting DB table identities
    const con = await client.connect();
    await con.query(`TRUNCATE TABLE order_products RESTART IDENTITY CASCADE`);
    await con.query(`TRUNCATE TABLE orders RESTART IDENTITY CASCADE`);
    await con.query(`TRUNCATE TABLE products RESTART IDENTITY CASCADE`);
    await con.query(`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`);
    await con.query(`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);
    con.release();
  });

  userRoutes(request);
  categoryRoutes(request);
  productRoutes(request);
  orderRoutes(request);
  dashboardRoutes(request);
});
