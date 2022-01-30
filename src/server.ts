import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

//importing routers
import userRouter from './router/userRouter';
import categoryRouter from './router/categoryRouter';
import productRouter from './router/productRouter';
import dashboardRouter from './router/dashboardRouter';
import orderRouter from './router/orderRouter';

const app: express.Application = express();
const host: string = process.env.HOST as string;
const port: number = process.env.port as unknown as number;
const address = `${host}:${port}`;

//General Middlewares
// TODO: implement cors
app.use(bodyParser.json());

//Routing
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/dashboard', dashboardRouter);
app.use('/orders', orderRouter);

//Handle unkown endpoints
app.all('*', (req: Request, res: Response) =>
  res.status(404).json({
    status: 'fail',
    error: `Endpoint(${req.originalUrl}) Not Found code ${res.statusCode}`,
  })
);

//Listen
app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
