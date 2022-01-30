import product from '../interface/product';
import updateProduct from '../interface/updateProduct';
import client from '../database';

export default class ProductStore {
  async index(): Promise<product[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products`;
      const results = await con.query(sql);
      con.release();

      return results.rows;
    } catch (err) {
      throw `can't get products ${err}`;
    }
  }

  async create(pro: product): Promise<product> {
    try {
      //TODO: check category first
      const con = await client.connect();
      const sql = `INSERT INTO products (name, price, category_id) VALUES($1, $2, $3) RETURNING *`;
      const results = await con.query(sql, [
        pro.name,
        pro.price,
        pro.category_id,
      ]);

      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't create products ${err}`;
    }
  }

  async show(id: number): Promise<product> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const results = await con.query(sql, [id]);
      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't get product with id(${id}): ${err}`;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const con = await client.connect();
      const sql = `DELETE FROM products WHERE id=$1 RETURNING *`;
      const results = await con.query(sql, [id]);
      con.release();

      if (!results.rows[0]) throw `product with id:(${id}) not found!`;
    } catch (err) {
      throw `can't delete product: ${err}`;
    }
  }

  async update(updateProductObj: updateProduct): Promise<product> {
    try {
      //first generate sql statment
      let arr: string[] = [];

      for (const [key, value] of Object.entries(updateProductObj)) {
        if (key !== 'id')
          arr.push(
            `${key}=${typeof value === 'string' ? "'" + value + "'" : value}`
          );
      }

      const con = await client.connect();
      const sql = ` UPDATE products SET ${arr.join(
        ', '
      )} WHERE id=$1 RETURNING *`;

      const results = await con.query(sql, [updateProductObj.id]);
      con.release();

      if (!results.rows[0])
        throw `product with id:(${updateProductObj.id}) not found!`;

      return results.rows[0];
    } catch (err) {
      throw `can't update product: ${err} with ${updateProductObj}`;
    }
  }
}
