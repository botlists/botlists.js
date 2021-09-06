const Axios = require('axios').default;

/**
 * An module to auto send your server counts to botlists.com
 * @param {*} client Your Discord Bot Client
 * @param {String} token Your Bot's Token for Website API
 * @param {Number} timeout Timeinterval between sending server count
 * @param {Boolean} disableConsole Whether you want console logs or not
 */
module.exports = async function sendCount(client, token, disableConsole = false) {

    Axios.patch(`https://api.botlists.com/bot/${client.user.id}`, {
        // The bot data
        guilds: client.guilds.cache.size,
        shards: client.shard ? client.shard.count : 0,
        status: client.user.presence ? client.user.presence.status : "online"
    }, { // The authorization
        headers: {
            Authorization: token
        }
    }).then(() => {
        if (!disableConsole) {
            console.log("[ botlists.js ] : Successfully Updated Server Count");
        }
    }).catch(() => {
        if (!disableConsole) {
            console.log("[ botlists.js ] : Failed in Updating Server Count");
        }
    });
}