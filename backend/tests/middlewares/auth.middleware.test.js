import authMiddleware from '../../middlewares/auth.middleware.js';
import jwt from 'jsonwebtoken';
import DB from '../../db/index.js';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  beforeEach(() => {
    DB.users = [];
    jwt.verify.mockClear();
  });

  it('should authorize a valid token', () => {
    const user = { id: 1 };
    DB.createUser(user);
    const req = {
      headers: { authorization: 'Bearer fakeToken' },
    };
    const res = {};
    const next = jest.fn();
    jwt.verify.mockReturnValue({ userId: 1 });

    authMiddleware(req, res, next);

    expect(req.user).toBe(user);
    expect(next).toHaveBeenCalled();
  });

  it('should throw an error for an invalid token', () => {
    const req = {
      headers: { authorization: 'Bearer fakeToken' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Unauthorized',
    }));
  });
});