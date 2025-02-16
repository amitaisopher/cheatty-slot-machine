import { CustomError } from "../core/errors.js"
import DB from '../db/index.js'
import { generateRandomId } from '../utils/helpers.js'


export const getSession = (req, res) => {
    const session = DB.getSession(req.params.id);
    if (!session) {
        throw new CustomError(404, 'Session not found');
    }
    res.json(session);
    }

export const createSession = (req, res) => {
    const user = 'bla'
    const session = {
        id: generateRandomId(), 
        userId: user, 
        createdAt: new Date(),
        credit: 10,
    };
    DB.createSession(session);
    res.json(session);
    }

// export const playSession = (req, res) => {
//     const session = DB.getSession(req.params.id);
//     if (!session) {
//         throw new CustomError(404, 'Session not found');
//     }
//     if (session.credit === 0) {
//         throw new CustomError(400, 'No credit left');
//     }
//     results = generateRandomResults(req.userId);
//     session.playedAt = new Date();
//     session.credit -= 1;
//     DB.updateSession(session.id, session);
//     res.json(session);
//     }