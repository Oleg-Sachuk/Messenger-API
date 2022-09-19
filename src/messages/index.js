'use strict';

const Message = require('../models/Message');

const getMessage = async (req, res) => {
    const id = req.params.id;

    try {
        const message = await Message.getMessage(id);
        await res.status(200).send(message);
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const sendMessage = async (req, res) => {
    const data = req.body;
    const file = req.files
    const {from_user, to_user, text} = data;

    if (!from_user || !to_user || !text) {
        await res.send({
            status: 'fail',
            message: 'Not enough data',
        });
        return;
    }

    try {
        let image = null;
        if (file) image = file.path;
        const message = await Message.send({
            from_user,
            to_user,
            text,
            timestamp: Date.now(),
            image
        });
        const isSent = !!message[0].id;

        await res.status(200).send({sent: isSent});
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const getUserMessages = async (req, res) => {
    const userId = req.params.user_id;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const cursor = req.query.cursor ?? null;

        let {messages: collection, nextId: nextCursor, count: count} = await Message.getAccountMessages(userId, cursor, limit);
        const hasMore = nextCursor !== null

        const messages = {
            data: collection,
            paging: {
                hasMore,
                nextCursor: hasMore ? nextCursor : null,
            },
            count: count,
        }
        await res.status(200).send(messages);
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const getMessageHistory = async (req, res) => {
    try {
        const messages = await Message.getRecordHistory();
        const stats = await Message.getRecordCount();

        await res.status(200).send({
            history: messages,
            byDays: stats,
        });
    } catch (e) {
        console.log('Error ::', e.message);
        await res.send({
            status: 'fail',
            message: e?.message || e,
        });
    }
};

const deleteMessage = async (req, res) => {
    const id = req.params.id;
    if (!id) throw new Error('Insufficient params');

    try {
        const message = await Message.getMessage(id);
        if (!message || !message.length) {
            await res.send({
                status: 'fail',
                message: 'No such message to delete',
            });
            return;
        }

        const removed = await Message.delete(id)
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
    getMessage,
    sendMessage,
    getUserMessages,
    getMessageHistory,
    deleteMessage,
};