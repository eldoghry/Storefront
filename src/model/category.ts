import category from '../interface/category';
import client from '../database';

export default class CategoryStore {
  async index(): Promise<category[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM categories`;
      const results = await con.query(sql);
      con.release();

      return results.rows;
    } catch (err) {
      throw `can't get categories ${err}`;
    }
  }

  async create(name: string): Promise<category> {
    try {
      const con = await client.connect();
      const sql = `INSERT INTO categories (name) VALUES($1) RETURNING *`;
      const results = await con.query(sql, [name]);

      con.release();

      console.log('cat created');
      return results.rows[0];
    } catch (err) {
      throw `can't create categories ${err}`;
    }
  }

  async show(id: number): Promise<category> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM categories WHERE id=$1`;
      const results = await con.query(sql, [id]);
      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't get category with id(${id}): ${err}`;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      //TODO: check if there products with cat before delete it

      const con = await client.connect();
      const sql = `DELETE FROM categories WHERE id=$1 RETURNING *`;
      const results = await con.query(sql, [id]);
      con.release();

      if (!results.rows[0]) throw `category with id:(${id}) not found!`;
    } catch (err) {
      throw `can't delete category: ${err}`;
    }
  }

  async update(cat: category): Promise<category> {
    try {
      const con = await client.connect();
      const sql = ` UPDATE categories SET name= $2 WHERE id=$1 RETURNING *`;
      const results = await con.query(sql, [cat.id, cat.name]);
      con.release();

      if (!results.rows[0]) throw `category with id:(${cat.id}) not found!`;
      return results.rows[0];
    } catch (err) {
      throw `can't update category: ${err}`;
    }
  }
}
