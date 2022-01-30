import product from '../interface/product';
import client from '../database';

export default class DashboardQueries {
  async productWithCategory(categoryID: number): Promise<product[]> {
    try {
      const con = await client.connect();
      const sql = `SELECT products.id, products.name, products.price, categories.name as category_name FROM products inner JOIN categories ON products.category_id = categories.id  WHERE products.category_id = $1`;
      const results = await con.query(sql, [categoryID]);
      con.release();

      return results.rows;
    } catch (err) {
      throw `can't get product with category(${categoryID}): ${err}`;
    }
  }
}
