import {Router} from 'express';
import { createUser, getUser } from '../controllers/user.controller.js';

const userRouter = Router();


userRouter.get('/:id', getUser);
userRouter.post('/', createUser);

export default userRouter;