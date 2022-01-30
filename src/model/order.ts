import order from '../interface/order';
// import updateorder from '../interface/updateorder';
import client from '../database';

export default class OrderStore {
  async index(): Promise<order[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM orders`;
      const results = await con.query(sql);
      con.release();

      return results.rows;
    } catch (err) {
      throw `can't get orders ${err}`;
    }
  }

  async create(userID: number): Promise<order> {
    try {
      //TODO: check category first
      const con = await client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES('active',$1) RETURNING *`;
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
      const results = await con.query(sql, [id]);
      con.release();

      if (!results.rows[0]) throw `order with id:(${id}) not found!`;
    } catch (err) {
      throw `can't delete order: ${err}`;
    }
  }

  async update(orderObj: order): Promise<order> {
    try {
      //first generate sql statment
      let arr: string[] = [];

      for (const [key, value] of Object.entries(orderObj)) {
        if (key !== 'id')
          arr.push(
            `${key}=${typeof value === 'string' ? "'" + value + "'" : value}`
          );
      }

      const con = await client.connect();
      const sql = ` UPDATE orders SET ${arr.join(
        ', '
      )} WHERE id=$1 RETURNING *`;

      const results = await con.query(sql, [orderObj.id]);
      con.release();

      if (!results.rows[0]) throw `order with id:(${orderObj.id}) not found!`;

      return results.rows[0];
    } catch (err) {
      throw `can't update order: ${err} with ${orderObj}`;
    }
  }
}
