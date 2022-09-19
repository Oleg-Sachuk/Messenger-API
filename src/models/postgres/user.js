const pgr = require('../../utils/postgres');

class _userPostgres {
    async _getUser(id) {
       return await pgr.getOne('users', 'id', id);
    }

    async _getUserByEmail(email) {
        return await pgr.getOne('users', 'email', email);
    }

    async _addUser(user) {
       return await pgr.insert('users', user);
    }

    async _delete(id) {
       return await pgr.remove('users', 'id', id);
    }

    async _countData() {
        let tx = await pgr.count('users');
        tx = Number(tx[0]?.count) || 0;

        return tx;
    }
}

module.exports = _userPostgres;
