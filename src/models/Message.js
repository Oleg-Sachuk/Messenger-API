'use strict'

const _message = require('./postgres/message');

class Message extends _message {
  constructor() {
    super();
  }

  async send (data) {
    return await this._sendMessage(data);
  }

  async delete (id) {
    return await this._deleteMessage(id);
  }

  async getAccountMessages(userId, cursor, count) {
    return await this._getAccountMessages(userId, cursor, count);
  }

  async getMessage(id) {
    return await this._getMessage(id);
  }

  async getRecordHistory() {
    return await this._getRecordHistory()
  }

  async getRecordCount() {
    return await this._getRecordStatistic()
  }

  async countData() {
    return this._countData();
  }
}

const message = new Message();

module.exports = message;
