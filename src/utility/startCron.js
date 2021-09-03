const cron = require('node-cron');
const sendCount = require('./sendCount');

/**
 * Module to start cron-job
 * @param {*} client 
 * @param {String} token 
 * @param {Boolean} disableConsole 
 * @returns 
 */
module.exports = async (client, token, disableConsole = false) => {
    return new Promise((resolve, reject) => {
        // If client is ready i.e. it have its data
        if (client.isReady()) {
            sendCount(client, token, disableConsole).then(v => {
                // Success
                cron.schedule("* */1 * * *", sendCount.bind(this, client, token, disableConsole));
                resolve("Auto Server Count Sender is activated");
            }).catch(e => {
                reject(e)
            })
        }
        else {
            client.once('ready', () => {
                sendCount(client, token, disableConsole).then(v => {
                    // Success
                    cron.schedule("* */1 * * *", sendCount.bind(this, client, token, disableConsole));
                    resolve("Auto Server Count Sender is activated");
                }).catch(e => {
                    reject(e)
                })
            });
        }
    })
}