import order from '../interface/order';
import cart from '../interface/cart';
import client from '../database';

export default class OrderStore {
  async index(userID: number, status = ''): Promise<order[]> {
    try {
      const con = await client.connect();
      const sql = status
        ? `SELECT * FROM orders WHERE user_id=$1 AND status='${status}'`
        : `SELECT * FROM orders WHERE user_id=$1`;
      // const sql = `SELECT * FROM orders WHERE user_id=$1`;

      console.log(sql);

      const results = await con.query(sql, [userID]);
      con.release();

      // console.log(results.rows);
      return results.rows;
    } catch (err) {
      throw `can't get orders: ${err}`;
    }
  }

  async create(userID: number): Promise<order> {
    try {
      //TODO: check category first
      const con = await client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES('active', $1) RETURNING *`;
      const results = await con.query(sql, [userID]);

      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't create orders ${err}`;
    }
  }

  async show(id: number): Promise<order> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=$1`;
      const results = await con.query(sql, [id]);
      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't get order with id(${id}): ${err}`;
    }
  }

  //TODO: delete also fro order_products
  async delete(id: number): Promise<void> {
    try {
      const con = await client.connect();

      const sql = `DELETE FROM orders WHERE id=$1 RETURNING *`;

      await con.query(sql, [id]);

      con.release();
    } catch (err) {
      throw `can't delete order: ${err}`;
    }
  }

  async update(id: number, status: string): Promise<order> {
    try {
      const con = await client.connect();
      const sql = ` UPDATE orders SET status=$2 WHERE id=$1 RETURNING *`;

      const results = await con.query(sql, [id, status]);
      con.release();

      if (!results.rows[0]) throw `order with id:(${id}) not found!`;

      return results.rows[0];
    } catch (err) {
      throw `can't update order: ${err} with id:${id}`;
    }
  }

  async addProduct(order_id: number, product_id: number, quantity: number): Promise<cart> {
    try {
      //TODO: check category first
      const con = await client.connect();

      //delete old row if exist
      // await con.query(`DELETE FROM order_products where order_id = $1 AND product_id = $2`, [order_id, product_id]);

      //try to update row if exist
      let results = await con.query(
        `UPDATE order_products SET quantity = $3 where order_id = $1 AND product_id = $2 RETURNING *`,
        [order_id, product_id, quantity]
      );

      //if it new entry create new row
      if (!results.rowCount) {
        const sql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *`;
        results = await con.query(sql, [order_id, product_id, quantity]);
      }

      con.release();
      return results.rows[0];
    } catch (err) {
      throw `can't add Products to order. ${err}`;
    }
  }

  async cart(order_id: number): Promise<cart[]> {
    try {
      //TODO: check category first
      const con = await client.connect();
      const sql = `SELECT product_id, name, quantity FROM order_products INNER JOIN products on products.id = order_products.product_id WHERE order_id = $1`;
      const results = await con.query(sql, [order_id]);

      con.release();
      return results.rows;
    } catch (err) {
      throw `can't return cart. ${err}`;
    }
  }
}
