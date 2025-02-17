import { signup } from '../../controllers/auth.controller.js';
import DB from '../../db/index.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  beforeEach(() => {
    DB.users = [];
    jwt.sign.mockClear();
  });

  it('should sign up a new user', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jwt.sign.mockReturnValue('fakeToken');

    await signup(req, res);

    expect(DB.users.length).toBe(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      data: expect.objectContaining({
        token: 'fakeToken',
      }),
    }));
  });
});