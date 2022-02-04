import { Request, Response } from 'express';
import UserStore from '../model/user';
import user from '../interface/user';
import jwt from 'jsonwebtoken';
import normalizeString from '../utilites/normalizeString';
import customErrorRes from '../utilites/customError';

// TODO: Implement expired token check
// TODO: Implement login and logout
// TODO: Implement update delete users

const index = async (_req: Request, res: Response) => {
  try {
    const users: user[] = await new UserStore().index();

    res.status(200).json({
      status: 'success',
      data: { results: users.length, users },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

//register
const create = async (req: Request, res: Response) => {
  try {
    const username: string = normalizeString(req.body.username);
    const firstname: string = normalizeString(req.body.firstname);
    const lastname: string = normalizeString(req.body.lastname);
    const password: string = normalizeString(req.body.password);

    const newUser: user = await new UserStore().create({
      username,
      firstname,
      lastname,
      password,
    });

    const userSign = jwt.sign(newUser as user, process.env.TOKEN_ACCESS_SECRET as string, {
      expiresIn: '10h',
    });

    res.status(201).json({
      status: 'success',
      token: userSign,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    // TODO: check id and token exit firstor return 400
    // TODO: check token secret or return 500

    const authHeader = req.headers.authorization;
    const token: string = authHeader?.split(' ')[1] as string;

    const decodedUser = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;
    const user = await new UserStore().show(decodedUser.id as number);
    user.token = token;

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    // TODO: check id and token exit firstor return 400
    // TODO: check token secret or return 500

    const authHeader = req.headers.authorization;
    const token: string = authHeader?.split(' ')[1] as string;

    const decodedUser: user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;

    await new UserStore().delete(decodedUser.id as number);

    res.sendStatus(204);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

//login when token is exprired
const login = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const authUser = await new UserStore().login(username, password);

    if (!authUser) return customErrorRes(res, 401, 'Access Denied Wrong Credintials');

    const userSign = jwt.sign(authUser as user, process.env.TOKEN_ACCESS_SECRET as string, {
      expiresIn: '10h',
    });

    res.status(200).json({
      status: 'success',
      token: userSign,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: err,
    });
  }
};

// const update = async (req: Request, res: Response) => {
//   try {
//     const id = parseInt(req.params.id);
//     const username: string = req.body.username;

//     const password: string = req.body.password;
//     const new_password: string = req.body.new_password;
//     const new_password_confirmation: string = req.body.new_password_confirmation;

//     const invalidMsg = [];

//     const authUser = await new UserStore().login(username, password);

//     if (!authUser) return customErrorRes(res, 401, 'Access Denied Wrong Credintials');

//     //sign new user object
//     const userSign = jwt.sign(authUser as user, process.env.TOKEN_ACCESS_SECRET as string, {
//       expiresIn: '10h',
//     });

//     res.status(200).json({
//       status: 'success',
//       token: userSign,
//     });
//   } catch (err) {
//     customErrorRes(res, 500, err as string);
//   }
// };

export default {
  index,
  create,
  show,
  destroy,
  login,
  // update,
};
