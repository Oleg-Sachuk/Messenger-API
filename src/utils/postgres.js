const postgres = require('postgres');

const sql = postgres({
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

/**
 * Insert entity into DB table
 * @param table {String} name of DB table
 * @param data {Array<Object>} data to insert
 * @returns {Promise<void>}
 */
const insert = async (table, data) => {
    return await sql`insert into ${sql(table)} ${sql(data)} RETURNING id`;
}

/**
 * Delete entire table from DB
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const dropTable = async (table) => {
    await sql`DROP TABLE ${sql(table)}`;
}

/**
 * Delete complete data from an existing table
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const purge = async (table) => {
    await sql`TRUNCATE TABLE ${sql(table)}`;
}

/**
 * Get data from DB by field names
 * @param fields {Array<String>} names of DB fields
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const getByFieldNames = async (fields, table) => {
    return await sql`SELECT ${sql(fields)} FROM ${sql(table)}`;
}

/**
 * Get all table data from DB
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const getAll = async (table) => {
    return await sql`SELECT * FROM ${sql(table)}`;
}

/**
 * Update entity in DB table
 * @param table {String} name of DB table
 * @param key {String} name of selected key field
 * @param value {String || Number} value of selected key field
 * @param data {Object} data to update
 * @returns {Promise<void>}
 */
const update = async (table, key, value, data) => {
    return await sql`
    UPDATE ${sql(table)} SET ${sql(data)}
    WHERE ${sql(key)} = ${value}`;
}

/**
 * Delete entity from DB table
 * @param table {String} name of DB table
 * @param key {String} name of selected key field
 * @param value {String || Number} value of selected key field
 * @returns {Promise<void>}
 */
const remove = async (table, key, value) => {
    return await sql`DELETE FROM ${sql(table)}
    WHERE ${sql(key)} = ${value} RETURNING id`;
}

/**
 * Count all elements of certain table
 * @param table {String} name of DB table
 * @param userId {String} user id
 * @returns {Promise<number>}
 */
const count = async (table, userId) => {
    return await sql`
    SELECT COUNT(*) FROM ${sql(table)} ${
        userId
            ? sql`WHERE from_user = ${userId} OR to_user = ${userId}`
            : sql``
        }
    `;
}

/**
 * Retrieve specific data from table using static statement
 * @param table {String} name of DB table
 * @param fields {Array<String> || null} names of DB fields
 * @param key {String} name of selected key field
 * @param value value {String || Number} value of selected key field
 * @returns {Promise<void>}
 */
const staticQuery = async (table, fields, key, value) => {
    return await sql`
    SELECT ${
        fields
            ? sql(fields)
            : sql`*`
    }
    FROM ${sql(table)} ${
        value
            ? sql`WHERE ${sql(key)} = ${value}`
            : sql``
    }`;
}

/**
 * Retrieve specific data from table using dynamic condition
 * @param table {String} name of DB table
 * @param fields {Array<String> || null} names of DB fields
 * @param filter {Boolean} flag to enable/disable filter
 * @param condition {String} executive condition
 * @returns {Promise<void>}
 */
const dynamicQuery = async (table, fields, filter, condition) => {
    return await sql`
    SELECT ${
        fields
            ? sql(fields)
            : sql`*`
    }
    FROM ${sql(table)} ${
        filter
            ? condition
            : sql``
    }`;
}

/**
 * Get blocks from DB with filter
 * @param min {String || null}
 * @param max {String}
 * @param count {Number}
 * @returns {Promise<void>}
 */
const getBlocks = async (min, max, count) => {
    return await sql`
    SELECT * FROM blocks WHERE ${
        min
        ? sql`sort >= ${min} AND `
        : sql``
    }
    sort <= ${max} ORDER BY sort DESC LIMIT ${count}
    `;
}

/**
 * Get one table data from DB with order by
 * @param table {String} name of DB table
 * @param orderBy {String} name of DB fields with condition
 * @returns {Promise<void>}
 */
const getOneWithOrderBy = async (table, orderBy) => {
    return await sql`
    SELECT * FROM ${sql(table)} 
    ORDER BY ${sql(orderBy)} DESC LIMIT 1
    `;
}

/**
 * Get transaction from DB with order by
 * @param field {String} name of DB table field
 * @param userId {String} user id
 * @param cursor {String} last hash
 * @param count {Number} limit
 * @returns {Promise<void>}
 */
const getMessages = async (field, userId, cursor, count) => {
    return await sql`
    SELECT ${sql(field)} FROM messages
    WHERE 
    ${cursor
        ? sql`timestamp < ${cursor} AND`
        : sql``
    }
    (from_user = ${userId} OR to_user = ${userId})
    ORDER  BY timestamp DESC LIMIT ${count}
    `;
}

/**
 * Get latest message from DB
 */
const getLatestMessage = async () => {
    return await sql`
    SELECT * FROM messages ORDER BY timestamp DESC LIMIT 1
    `;
}

/**
 * Get all the records from past 7 days with order by date
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const getRecordHistory = async (table) => {
    return await sql`
    SELECT * FROM ${sql(table)}
    WHERE timestamp > CURRENT_DATE - 7
    ORDER BY timestamp::date DESC;
    `;
}

/**
 * Get the record statistics from past 7 days with order by date
 * @param table {String} name of DB table
 * @returns {Promise<void>}
 */
const getRecordStatistics = async (table) => {
    return await sql`
    SELECT timestamp::date, COUNT(*)
    FROM messages
    WHERE timestamp > CURRENT_DATE - 7
    GROUP BY timestamp::date
    ORDER BY timestamp::date ASC;
    `;
}

/**
 * Check is exists table in DB
 * @param table {String} name of DB table
 */
const checkIsExistsTable = async (table) => {
    return await sql`
    SELECT EXISTS (
        SELECT FROM pg_tables WHERE tablename  = ${table}
    );`
}

/**
 * Get one table data from DB with order by
 * @param table {String} name of DB table
 * @param field {String} name of DB table field
 * @param param {String} parameter for sort
 * @returns {Promise<void>}
 */
const getOne = async (table, field, param) => {
    return await sql`
    SELECT * FROM ${sql(table)} 
    WHERE ${sql(field)} = ${param}
    `;
}

module.exports = {
    sql,
    insert,
    getByFieldNames,
    getAll,
    count,
    staticQuery,
    dynamicQuery,
    update,
    remove,
    purge,
    dropTable,
    getBlocks,
    getOneWithOrderBy,
    getMessages,
    getLatestMessage,
    getRecordHistory,
    getRecordStatistics,
    checkIsExistsTable,
    getOne,
};