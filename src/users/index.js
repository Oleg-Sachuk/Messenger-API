'use strict';

const User = require('../models/User');

const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.getUserData(id);
        await res.status(200).send(user);
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const addUser = async (req, res) => {
    const data = req.body.user;
    if (!data || !data.email) throw new Error('No required data provided');

    try {
        data.created_at = Date.now();
        await User.add(data);
        const user = await User._getUserByEmail(data.email);

        await res.status(200).send({user: user[0]});
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    if (!id) throw new Error('Insufficient params');

    try {
        const user = await User._getUser(id);
        if (!user || !user.length) {
            await res.send({
                status: 'fail',
                message: 'No such user to delete',
            });
            return;
        }

        const removed = await User._delete(id)
        await res.status(200).send({removed: removed[0]});
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

module.exports = {
    getUser,
    addUser,
    deleteUser,
};