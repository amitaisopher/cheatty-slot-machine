import DB from '../db/index.js'
import { generateRandomId, generateRandomNumberBeteenRange } from '../utils/helpers.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

export const signup = async (req, res, next) => {
    try {
        const newUser = {
            id: generateRandomId(),
            credit: generateRandomNumberBeteenRange(20, 100),
        }
        DB.createUser(newUser)
        const token = jwt.sign({userId: newUser.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        res.status(201).json({
            success: true, 
            message: 'new user created successfully', 
            data: {
                user: newUser,
                token
            }
        })
    } catch(error) {
        next(error)
    }
}