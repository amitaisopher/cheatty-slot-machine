import { getSession, createSession, playSession, cashoutSession } from '../../controllers/session.controller.js';
import DB from '../../db/index.js';
import { CustomError } from '../../core/errors.js';

describe('Session Controller', () => {
  beforeEach(() => {
    DB.sessions = [];
    DB.users = [];
  });

  it('should create a session', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    const req = {user};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createSession(req, res);

    expect(DB.sessions.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      session: expect.any(Object),
    }));
  });

  it('should get a session by ID', () => {
    const session = { id: 1, credit: 10 };
    DB.createSession(session);
    const req = { params: { id: '1' } };
    const res = { json: jest.fn() };

    getSession(req, res);

    expect(res.json).toHaveBeenCalledWith(session);
  });

  it('should throw an error if session is not found', () => {
    const req = { params: { id: '1' } };
    const res = {};
    expect(() => getSession(req, res)).toThrow(CustomError);
  });
});