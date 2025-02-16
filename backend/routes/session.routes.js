import {Router} from 'express';
import { getSession, createSession, playSession, cashoutSession } from '../controllers/session.controller.js';


const sessionRouter = Router();

sessionRouter.get('/play/:id', playSession);
sessionRouter.get('/:id', getSession);
sessionRouter.post('/', createSession);
sessionRouter.post('/cashout/:id', cashoutSession);


export default sessionRouter;