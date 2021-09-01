const sendCount = require('./utility/sendCount');

/**
 * An module to auto send your server counts to botlists.com
 * @param {*} client Your Discord Bot Client
 * @param {String} token Your Bot's Token for Website API
 * @param {Number} timeout Timeinterval between sending server count
 * @param {Boolean} disableConsole Whether you want console logs or not
 */
module.exports = (client, token, timeout = 1800000, disableConsole = false) => {
    return new Promise((resolve, reject) => {
        // Invalid Parameter handling
        if (!client || !"isReady" in client || typeof (client) !== "object") return reject("Invalid Client was provided");
        if (!token || typeof (token) !== "string" || token.length !== 36) return reject("Invalid Token was provided");
        if ((typeof (timeout) !== "number" && typeof (timeout) !== "bigint") || timeout < 300000) return reject("Invalid Timeout, Timeout should be in milli seconds and at least greater than 300000");
        if (typeof (disableConsole) !== "boolean") return reject("Invalid disableConsole type, it should be either false or true");

        // If client is ready i.e. it have its data
        if (client.isReady()) sendCount(client, token, timeout, disableConsole);
        else client.once('ready', () => sendCount(client, token, timeout, disableConsole));

        resolve("Auto Server Count Sender is activated");
    })
}