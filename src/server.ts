import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//importing routers
import userRouter from './router/userRouter';
import categoryRouter from './router/categoryRouter';
import productRouter from './router/productRouter';
import dashboardRouter from './router/dashboardRouter';
import orderRouter from './router/orderRouter';

const app: express.Application = express();
const host: string = process.env.SERVER_HOST as string;
const port: number = parseInt(process.env.SERVER_PORT as unknown as string);
const address = `${host}:${port}`;

//General Middlewares
// TODO: implement cors
const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//Routing
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/dashboard', dashboardRouter);

//Handle unknown endpoints
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

export default app;
