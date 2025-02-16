import {Router} from 'express';
import { getSession, createSession, playSession, deleteSession } from '../controllers/session.controller.js';


const sessionRouter = Router();

sessionRouter.get('/play/:id', playSession);
sessionRouter.get('/:id', getSession);
sessionRouter.post('/', createSession);
sessionRouter.delete('/:id', deleteSession);


export default sessionRouter;