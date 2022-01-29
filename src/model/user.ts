import user from '../interface/user';
import client from '../database';
import bcrypt from 'bcrypt';

export default class UserStore {
  async index(): Promise<user[] | undefined> {
    try {
      const con = await client.connect();
      const sql = `SELECT id, username, firstname, lastname FROM users`;
      const results = await con.query(sql);
      con.release();

      return results.rows;
    } catch (err) {
      throw `can't get users ${err}`;
    }
  }

  async create(u: user): Promise<user> {
    try {
      const con = await client.connect();

      //1) create hash
      const pepper: string = process.env.BCRYPT_PASSWORD as string;
      const salt: number = parseInt(process.env.SALT_ROUNDS as string);
      const hash: string = bcrypt.hashSync(u.password + pepper, salt);

      const sql = `INSERT INTO users (username, firstname, lastname, password_digest) VALUES($1,$2,$3, $4) RETURNING *`;
      const results = await con.query(sql, [u.username, u.firstname, u.lastname, hash]);

      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't create users ${err}`;
    }
  }

  async show(id: number): Promise<user> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1`;
      const results = await con.query(sql, [id]);
      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't get user with id(${id}): ${err}`;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const con = await client.connect();
      const sql = `DELETE FROM users WHERE id=$1 RETURNING *`;
      const results = await con.query(sql, [id]);

      console.log(results.rows[0]);
      con.release();

      if (!results.rows[0]) throw `user with id:(${id}) not exist!`;
    } catch (err) {
      throw `can't delete user: ${err}`;
    }
  }

  //TODO: custom error message return like user not exist , wrong Credentials
  async auth(id: number, username: string, hash: string): Promise<boolean> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE id=$1 AND username = $2 AND password_digest=$3`;
      const results = await con.query(sql, [id, username, hash]);
      con.release();

      return results.rows[0];
    } catch (err) {
      throw `can't auth user with id(${id}): ${err}`;
    }
  }
}
