'use strict'

const _user = require('./postgres/user')

class User extends _user {
  async getUserData(id) {
    return await this._getUser(id);
  }

  async add(user) {
    return await this._addUser(user);
  }

  async getUserCount() {
    return await this._countData();
  }
}

const user = new User();

module.exports = user;
