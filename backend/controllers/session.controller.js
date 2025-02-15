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
    const session = {id: generateRandomId(), userId: user, createdAt: new Date()};
    DB.createSession(session);
    res.json(session);
    }