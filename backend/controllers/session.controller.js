import { CustomError } from "../core/errors.js";
import DB from "../db/index.js";
import { generateRandomId } from "../utils/helpers.js";
import {
  calculateCreditsWon,
  generateSlotMachineResults,
} from "../core/slotMachine.js";
import { SLOT_MACHINE_SYMPBOLS_SET } from "../config/slotMachine.js";


export const getSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError("Session ID is required", 400);
  }
  const session = DB.getSessionById(sessionId);
  if (!session) {
    throw new CustomError("Session not found", 404);
  }
  res.json(session);
};

export const createSession = (req, res) => {
  const session = {
    id: generateRandomId(),
    createdAt: new Date(),
    credit: 10,
    userId: req.user.id,
  };
  DB.createSession(session);
  res.status(201).json({session, symbols: SLOT_MACHINE_SYMPBOLS_SET});
};

export const deleteSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError("Session ID is required", 400);
  }
  const session = DB.getSessionById(sessionId);
  if (!session) {
    throw new CustomError("Session not found", 404);
  }
  DB.deleteSessionById(sessionId);
  res.status(204);
};

export const playSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError("Session ID is required", 400);
  }
  const session = DB.getSessionById(req.params.id);
  if (!session) {
    throw new CustomError("Session not found", 404);
  }
  if (session.userId !== req.user.id) {
    throw new CustomError("User not authorized to play this session", 403);
  }

  if (session.credit === 0) {
    throw new CustomError("No credit left in session", 400);
  }
  const results = generateSlotMachineResults(req.user, session); // generate results and cheat if needed
  session.credit += calculateCreditsWon(results); // return 0 if not a win or the amount won
  session.playedAt = new Date();
  session.credit -= 1;
  session.results = results;
  DB.updateSession(session.id, session);
  res.json(session);
};

export const cashoutSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError("Session ID is required", 400);
  }
  const session = DB.getSessionById(sessionId);
  if (!session) {
    throw new CustomError("Session not found", 404);
  }
  if (session.userId !== req.user.id) {
    throw new CustomError("User not authorized to cash out this session", 403);
  }
  const user = DB.getUserById(req.user.id);
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  try {
    user.credit += session.credit;
    DB.updateUser(user.id, user);
    session.credit = 0;
    DB.deleteSessionById(sessionId);
    res.json({success: true, message: "Session cashed out successfully", user, session});
  }
  catch (error) {
    throw new CustomError("Error cashing out session", 500);
  }
}