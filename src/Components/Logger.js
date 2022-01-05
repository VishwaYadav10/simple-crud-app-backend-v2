const DateTimeUtilities = require('./DateTimeUtilities');
const ExtraUtilities = require('./ExtraUtilities');

const dateTimeUtils = new DateTimeUtilities();
const extraUtils = new ExtraUtilities();

class Logger {

    constructor(className) {
        this.loggerUniqueId = extraUtils.getRandomString(12);
        this.className = className;
    }

    info(_message, ..._params) {
        console.info(extraUtils.formLoggingMessage(_message, 'INFO', this.loggerUniqueId, this.className, _params));
    }

    debug(_message, ..._params) {
        console.debug(extraUtils.formLoggingMessage(_message, 'DEBUG', this.loggerUniqueId, this.className, _params));
    }

    warn(_message, ..._params) {
        console.warn(extraUtils.formLoggingMessage(_message, 'WARN', this.loggerUniqueId, this.className, _params));
    }

    error(_message, _error) {
        console.error(dateTimeUtils.getISTTimestampInISOString(), 'ERROR', this.loggerUniqueId, this.className, ':', _message);
    }
}

module.exports = Logger;