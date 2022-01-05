const moment = require('moment');

class DateTimeUtilities {
    getISTTimestampInISOString() {
        return moment().format('yyyy-MM-DD HH:mm:ss.SSS');
    }
}

module.exports = DateTimeUtilities;