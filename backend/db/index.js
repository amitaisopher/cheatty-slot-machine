const DB = {
  users: [],
  createUser: function (user) {
    this.users.push(user);
  },
  getUserById: function (id) {
    return this.users.find((user) => user.id === Number(id));
  },
  updateUser: function (id, user) {
    const index = this.users.findIndex((user) => user.id === Number(id));
    this.users[index] = user;
  },
  deleteUser: function (id) {
    const index = this.users.findIndex((user) => user.id === Number(id));
    this.users.splice(index, 1);
  },
  sessions: [],
  createSession: function (session) {
    this.sessions.push(session);
  },
  getSession: function (id) {
    return this.sessions.find((session) => session.id === Number(id));
  },
  updateSession: function (id, session) {
    const index = this.sessions.findIndex(
      (session) => session.id === Number(id)
    );
    this.sessions[index] = session;
  },
  deleteSession: function (id) {
    const index = this.sessions.findIndex(
      (session) => session.id === Number(id)
    );
    this.sessions.splice(index, 1);
  },
};

export default DB;
