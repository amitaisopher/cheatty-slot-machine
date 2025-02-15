import {Router} from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router();


userRouter.get('/:id', authMiddleware, getUser);
userRouter.post('/', createUser);

export default userRouter;