import express from 'express';
import bodyParser from 'body-parser';

//importing routers
import userRouter from './router/userRouter';
import categoryRouter from './router/categoryRouter';

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

//Listen
app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});
