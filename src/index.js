const Axios = require('axios').default;
const { isClient, startCron } = require('./utility');

class botList {
  /**
    * An module to auto send your server counts to botlists.com
    * @param {*} client Your Discord Bot Client
    * @param {String} token Your Bot's Token for Website API
    * @param {Boolean} disableConsole Whether you want console logs or not
    */
  constructor(client, token, disableConsole = false) {
    if (!isClient(client)) return reject("Invalid Client was provided");
    if (!token || typeof (token) !== "string" || token.length !== 36) return reject("Invalid Token was provided");
    if (typeof (disableConsole) !== "boolean") return reject("Invalid disableConsole type, it should be either false or true");

    this.client = client;
    this.token = token;
    this.disableConsole = disableConsole;
  }

  /**
   * An module to get a bot's info on the botlists.com
   * @param {String} id The bot's ID who' info you want, If no ID is provided than it will return your client's info.
   */
  autoCounter() {
    return new Promise((resolve, reject) => {
      // Start the cron job
      startCron(this.client, this.token, this.disableConsole).then(v => resolve(v)).catch(e => reject(e));
    });
  }

  /**
   * An module to get a bot's info on the botlists.com
   * @param {String} id The bot's ID who' info you want, If no ID is provided than it will return your client's info.
   * @returns {Promise<botData>} The bot data on the website.
  */
  getBotInfo(id = "no_id") {
    return new Promise((resolve, reject) => {
      if (id !== "no_id" && (typeof (id) !== "string" || id.length !== 18)) throw new Error("Invalid Client ID was provided");

      // Sending the request to the API.
      Axios.get(`https://api.botlists.com/bot/${id === "no_id" ? this.client.user.id : id}`, {
        headers: { // Authorization
          Authorization: this.token
        }
      }).then(({ data }) => {
        resolve(data);
      }).catch(e => {
        reject(e.toJSON());
      })
    })
  }

  /**
    * An module to get a bot's widget of the botlists.com
    * @param {String} id The bot's ID who' widget you want, If no ID is provided than it will return your client's widget.
    * @returns {Prmoise<String>} Returns the HTML code of the widget. 
  */
  getBotWidget(id = "no_id") {
    return new Promise((resolve, reject) => {
      if (id !== "no_id" && (typeof (id) !== "string" || id.length !== 18)) throw new Error("Invalid Client ID was provided");

      Axios.get(`https://api.botlists.com/bot/${id === "no_id" ? this.client.user.id : id}/widget`).then(({ data }) => {
        resolve(data);
      }).catch(e => {
        reject(e.toJSON());
      })
    })
  }
}

module.exports = botList;

/**
 * @typedef {Object} botData The bot data on the botlists.com
 * @property {String} id The bot's ID.
 * @property {String} username The bot's username.
 * @property {String} avatar The bot's avatar.
 * @property {String} description The bot's short description.
 * @property {String} message An message from the API.
 * @property {Number} votes The number of todays votes on the website.
 * @property {Number} guilds The number of todays votes on the website.
 * @property {Boolean} cached Whether bot is cached on website or not.
 * @property {Array<voter> | undefined} voters The list of recent voters, only available for your bot.
 */

/**
 * @typedef {Object} voter The bot's voter object.
 * @property {String} _id The voter's Discord ID.
 * @property {String} username The voter's username.
 * @property {String} image The voter's avatar.
 */