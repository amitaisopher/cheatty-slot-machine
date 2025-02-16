import { CustomError } from "../core/errors.js";
import DB from "../db/index.js";
import { generateRandomId } from "../utils/helpers.js";
import {
  calculateCreditsWon,
  generateSlotMachineResults,
} from "../core/slotMachine.js";

export const getSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError(400, "Session ID is required");
  }
  const session = DB.getSessionById(sessionId);
  if (!session) {
    throw new CustomError(404, "Session not found");
  }
  res.json(session);
};

export const createSession = (req, res) => {
  const session = {
    id: generateRandomId(),
    createdAt: new Date(),
    credit: 10,
  };
  DB.createSession(session);
  res.json(session);
};

export const deleteSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError(400, "Session ID is required");
  }
  const session = DB.getSessionById(sessionId);
  if (!session) {
    throw new CustomError(404, "Session not found");
  }
  DB.deleteSessionById(sessionId);
  res.status(204);
};

export const playSession = (req, res) => {
  const sessionId = req.params.id;
  if (!sessionId) {
    throw new CustomError(400, "Session ID is required");
  }
  const session = DB.getSessionById(req.params.id);
  if (!session) {
    throw new CustomError(404, "Session not found");
  }
  if (session.credit === 0) {
    throw new CustomError(400, "No credit left in session");
  }
  const results = generateSlotMachineResults(req.user, session); // generate results and cheat if needed
  session.credit += calculateCreditsWon(results); // return 0 if not a win or the amount won
  session.playedAt = new Date();
  session.credit -= 1;
  session.results = results;
  DB.updateSession(session.id, session);
  res.json(session);
};
