const { isClient, startCron } = require('./utility');

/**
 * An module to auto send your server counts to botlists.com
 * @param {*} client Your Discord Bot Client
 * @param {String} token Your Bot's Token for Website API
 * @param {Boolean} disableConsole Whether you want console logs or not
 */
module.exports = (client, token, disableConsole = false) => {
    return new Promise((resolve, reject) => {
        // Invalid Parameter handling
        if (!isClient) return reject("Invalid Client was provided");
        if (!token || typeof (token) !== "string" || token.length !== 36) return reject("Invalid Token was provided");
        if (typeof (disableConsole) !== "boolean") return reject("Invalid disableConsole type, it should be either false or true");

        // Start the cron job
        startCron(client,token,disableConsole).then(v => resolve(v)).catch(e => reject(e));
    })
}