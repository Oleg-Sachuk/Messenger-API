const pgr = require('../../utils/postgres');

class _messagePostgres {
  async _getMessageNumberForUser(userId) {
    const count = await pgr.count('messages', userId);
    return count[0].count || 0;
  }

  async _getMessage(id) {
    return await pgr.getOne('messages', 'id', id);
  }

  async _sendMessage(data) {
    return await pgr.insert('messages', data);
  }

  async _deleteMessage(id) {
    return await pgr.remove('messages', 'id', id);
  }

  async _getAccountMessages(userId, cursor, count) {
    let messageIds = [];

    if (!cursor) messageIds = await pgr.getMessages('id', userId, null, count + 1);
    else {
      cursor = await pgr.sql`select timestamp from messages where id = ${cursor}`
      if (!cursor) throw Error('No such message with this timestamp');
      messageIds = await pgr.getMessages('id', userId, cursor[0].timestamp, count + 1);
    }
    messageIds = messageIds.map(obj => obj.id);
    let next = null;
    console.log('messageIds', messageIds);

    if (messageIds.length === count + 1) {
      next = messageIds[count];
      messageIds.pop();
    }

    const messages = await Promise.all(
      messageIds.map((id) => {
        return this._getMessage(id);
      })
    );

    const amount = await this._getMessageNumberForUser(userId);
    return {
      messages: messages,
      nextId: next,
      count: amount,
    };
  }

  async _getRecordHistory() {
    return await pgr.getRecordHistory('messages');
  }

  async _getRecordStatistic() {
    return await pgr.getRecordStatistics('messages');
  }

  async _countData() {
    let tx = await pgr.count('messages');
    tx = Number(tx[0]?.count) || 0;

    return tx;
  }
}

module.exports = _messagePostgres;
