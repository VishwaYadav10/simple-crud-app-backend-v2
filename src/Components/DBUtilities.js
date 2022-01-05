const mysql = require('mysql2');
const Logger = require('./Logger');

const logger = new Logger('DBUtilities');

class DBUtilities {

    constructor() { }

    async getConnection(_host, _user, _password, _database) {
        try {
            const connection = await mysql.createPool({
                host: _host,
                user: _user,
                password: _password,
                database: _database
            });
            return connection;
        }
        catch (e) {
            throw e;
        }
    }

    findById(_connection, _id, _tableName, callbackFnc) {

        logger.info('findById call for table -- {} with id -- {}', _tableName, _id);

        _connection.query('SELECT * FROM ?? WHERE id = ?', [_tableName, _id],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('findById call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    findByField(_connection, _fieldName, _fieldValue, _tableName, callbackFnc) {

        logger.info('findByField call for table -- {} with fieldName -- {} and fieldValue -- {}', _tableName, _fieldName, _fieldValue);

        _connection.query('SELECT * FROM ?? WHERE ?? = ?', [_tableName, _fieldName, _fieldValue],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('findByField call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    findAll(_connection, _tableName, callbackFnc) {

        logger.info('findAll call for table -- {}', _tableName);

        _connection.query('SELECT * FROM ??', [_tableName],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('findAll call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    save(_connection, _savingObject, _tableName, callbackFnc) {

        logger.info('save call for table -- {} with object -- {}', _tableName, _savingObject);

        _connection.query('INSERT INTO ?? (??) values (?)', [_tableName, Object.keys(_savingObject), Object.values(_savingObject)],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('save call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    deleteById(_connection, _id, _tableName, callbackFnc) {

        logger.info('deleteById call for table -- {} with id -- {}', _tableName, _id);

        _connection.query('DELETE FROM ?? WHERE id = ?', [_tableName, _id],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('deleteById call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    deleteAll(_connection, _tableName, callbackFnc) {

        logger.info('deleteAll call for table -- {}', _tableName);

        _connection.query('DELETE FROM ??', [_tableName],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('deleteAll call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }

    truncate(_connection, _tableName, callbackFnc) {

        logger.info('truncate call for table -- {}', _tableName);

        _connection.query('TRUNCATE TABLE ??', [_tableName],
            (_err, _result) => {
                if (_err) throw _err;
                else {
                    logger.info('truncate call result -- {}', _result);
                    return callbackFnc(_result);
                }
            });
    }
}

module.exports = DBUtilities;