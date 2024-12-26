import express, { Application, Request, Response } from 'express';
import { router } from './routes/main.route';
import { APP_PORT } from './config/configs';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(APP_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${APP_PORT}`);
});