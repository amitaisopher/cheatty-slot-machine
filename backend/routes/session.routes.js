import {Router} from 'express';
import { getSession, createSession } from '../controllers/session.controller.js';


const sessionRouter = Router();

sessionRouter.get('/', getSession);
sessionRouter.post('/', createSession);


export default sessionRouter;