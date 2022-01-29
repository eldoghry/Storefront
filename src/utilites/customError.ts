import { Response } from 'express';

const customErrorRes = (res: Response, statusCode: number, error: string) => {
  res.status(statusCode).json({
    status: 'error',
    error,
  });
};

export default customErrorRes;
