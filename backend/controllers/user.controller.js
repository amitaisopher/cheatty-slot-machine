import { CustomError } from "../core/errors.js"
import DB from '../db/index.js'


export const createUser = async (req, res) => {
    // generate a random id using Math.random() and Date.now()
    const id = Math.floor(Math.random() * 1000) + Date.now()
    const user = {id, credits: 10}
    DB.createUser(user)
    res.send(user)
}

export const getUser = (req, res) => {
    const {id} = req.params
    const user = DB.getUser(id)
    if (!user) {
        throw new CustomError('User not found', 404,)
    }
    res.send(user)
}