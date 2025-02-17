import DB from '../../db/index.js';

describe('Testing CRUD operations on DB', () => {
  beforeEach(() => {
    DB.users = [];
    DB.sessions = [];
  });

  it('should create a user', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    expect(DB.users).toContain(user);
  });

  it('should get a user by ID', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    const foundUser = DB.getUserById(1);
    expect(foundUser).toBe(user);
  });

  it('should update a user', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    const updatedUser = { id: 1, credit: 200 };
    DB.updateUser(1, updatedUser);
    expect(DB.users[0].credit).toBe(200);
  });

  it('should delete a user', () => {
    const user = { id: 1, credit: 100 };
    DB.createUser(user);
    DB.deleteUser(1);
    expect(DB.users).not.toContain(user);
  });

  it('should create a session', () => {
    const session = { id: 1, credit: 10 };
    DB.createSession(session);
    expect(DB.sessions).toContain(session);
  });

  it('should get a session by ID', () => {
    const session = { id: 1, credit: 10 };
    DB.createSession(session);
    const foundSession = DB.getSessionById(1);
    expect(foundSession).toBe(session);
  });

  it('should update a session', () => {
    const session = { id: 1, credit: 10 };
    DB.createSession(session);
    const updatedSession = { id: 1, credit: 20 };
    DB.updateSession(1, updatedSession);
    expect(DB.sessions[0].credit).toBe(20);
  });

  it('should delete a session', () => {
    const session = { id: 1, credit: 10 };
    DB.createSession(session);
    DB.deleteSessionById(1);
    expect(DB.sessions).not.toContain(session);
  });
});