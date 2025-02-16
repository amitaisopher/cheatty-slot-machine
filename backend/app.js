import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';
import authMiddleware from './middlewares/auth.middleware.js';
import sessionRouter from './routes/session.routes.js';
import authRouter from './routes/auth.routes.js';


const app = express();

// Allow requests from the React frontend running on localhost:3000
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);

app.use(authMiddleware);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sessions', sessionRouter)
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {console.log(`Cheatty-Slot-Machine server is running on port ${PORT}`)});