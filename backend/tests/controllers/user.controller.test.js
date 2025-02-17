import { getUser, updateUser } from '../../controllers/user.controller.js';
import DB from '../../db/index.js';
import { CustomError } from '../../core/errors.js';

describe('User Controller', () => {
  beforeEach(() => {
    DB.users = [];
  });

  it('should get a user by ID', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    const req = { params: { id: '1' }, user };
    const res = { send: jest.fn() };

    getUser(req, res);

    expect(res.send).toHaveBeenCalledWith(user);
  });

  it('should update a user', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    const req = { params: { id: '1' }, user, body: { credit: 200 } };
    const res = { send: jest.fn() };

    updateUser(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ credit: 200 }));
  });

  it('should throw an error if user is not authorized', () => {
    const req = { params: { id: '1' }, user: { id: 2 } };
    const res = {};
    expect(() => getUser(req, res)).toThrow(CustomError);
  });
});