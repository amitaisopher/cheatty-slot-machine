import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/api/v1/users', userRouter);
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {console.log(`Cheatty-Slot-Machine server is running on port ${PORT}`)});