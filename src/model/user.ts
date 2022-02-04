import user from '../interface/user';
import client from '../database';
import bcrypt from 'bcrypt';

export default class UserStore {
  async index(): Promise<user[]> {
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
  async login(username: string, password: string): Promise<user | null> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE username = $1`;
      const results = await con.query(sql, [username]);
      con.release();

      const user = results.rows[0];
      const pepper: string = process.env.BCRYPT_PASSWORD as string;

      const isPasswordCorrect: boolean = await bcrypt.compare(password + pepper, user.password_digest);

      if (isPasswordCorrect) return results.rows[0];
      else return null;
    } catch (err) {
      throw `can't authenticate user with username (${username}): ${err}`;
    }
  }

  async auth(username: string, hash: string): Promise<boolean> {
    try {
      const con = await client.connect();
      const sql = `SELECT * FROM users WHERE username = $1 AND password_digest = $2`;
      const results = await con.query(sql, [username, hash]);
      const user = results.rows[0];
      const isPasswordCorrect: boolean = hash === user.password_digest;
      return isPasswordCorrect;
    } catch (err) {
      throw `can't authenticate user with username (${username}): ${err}`;
    }
  }
}
