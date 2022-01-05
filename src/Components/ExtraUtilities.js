require('node-json-color-stringify');
const DateTimeUtilities = require('./DateTimeUtilities');

const dateTimeUtilities = new DateTimeUtilities();

class ExtraUtilities {

    formLoggingMessage(_message, _loggingType, _loggerUniqueId, _className, _params) {
        if (_params === undefined || _params.length === 0) {
            if (typeof (_message) === 'string') {
                return this.formatLoggingMessage(_message, _loggingType, _loggerUniqueId, _className);
            }
            else {
                return this.formatLoggingMessage(JSON.colorStringify(_message, undefined, 4), _loggingType, _loggerUniqueId, _className);
            }
        }
        else {
            let tempVar = _message;
            for (let param of _params) {
                if (typeof (param) !== 'object') {
                    param = JSON.stringify(param).replaceAll("\"", "");
                }
                else {
                    param = JSON.colorStringify(param, undefined, 4);
                }
                tempVar = tempVar.replace('{}', param);
            }
            return this.formatLoggingMessage(tempVar, _loggingType, _loggerUniqueId, _className);
        }
    }

    getRandomString(length) {
        var randomChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    formatLoggingMessage(_message, _loggingType, _loggerUniqueId, _className) {
        return dateTimeUtilities.getISTTimestampInISOString() + ' ' + _loggingType + ' ' + _loggerUniqueId + ' ' + _className + ' : ' + _message;
    }
}

module.exports = ExtraUtilities;