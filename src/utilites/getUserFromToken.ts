import jwt from 'jsonwebtoken';
import user from '../interface/user';

export default (token: string): user => {
  const user = jwt.verify(token, process.env.TOKEN_ACCESS_SECRET as string) as user;
  return user;
};
