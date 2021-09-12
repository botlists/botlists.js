const { isClient, startCron, get } = require('./utility');

class botList {
  // Private Properties
  #token;
  #client;
  #disableConsole;

  /**
    * An module to auto send your server counts to botlists.com
    * @param {*} client Your Discord Bot Client
    * @param {String} token Your Bot's Token for Website API
    * @param {Boolean} disableConsole Whether you want console logs or not
    */
  constructor(client, token = "no_token", disableConsole = false) {
    if (!isClient(client)) throw new Error("Invalid Client was provided");

    if (token !== "no_token" && (!token || typeof (token) !== "string" || token.length !== 36)) throw new Error("Invalid Token was provided");

    if (typeof (disableConsole) !== "boolean") throw new Error("Invalid disableConsole type, it should be either false or true");

    this.#client = client;
    this.#token = token;
    this.#disableConsole = disableConsole;
  }

  /**
   * An module to get a bot's info on the botlists.com
   * @param {String} id The bot's ID who' info you want, If no ID is provided than it will return your client's info.
   */
  autoCounter(token = "no_token") {
    return new Promise(async (resolve, reject) => {
      if (this.#token === "no_token" && token === "no_token") throw new Error("Please provide a token before using AutoCounter");

      if ((this.#token === "no_token" || token !== "no_token") && (!token || typeof (token) !== "string" || token.length !== 36)) throw new Error("Invalid Token was provided in AutoCounter method");

      // Start the cron job
      startCron(this.#client, token !== "no_token" ? token : this.#token, this.#disableConsole).then(v => resolve(v)).catch(e => reject(e));
    });
  }

  /**
   * An module to get a bot's info on the botlists.com
   * @param {String} id The bot's ID who' info you want, If no ID is provided than it will return your client's info.
   * @returns {Promise<botData>} The bot data on the website.
  */
  getBotInfo(id = "no_id") {
    return new Promise(async (resolve, reject) => {
      const data = await get(`bot/${id === "no_id" ? this.#client.user.id : id}`, this.#token);

      if (data.name === "Error") reject("Invalid Bot ID was provided");
      else resolve(data);
    })
  }

  /**
   * An module to get a user's info on the botlists.com
   * @param {String} id The user's ID who' info you want.
   * @returns {Promise<userData>} The user data on the website.
  */
  getUserInfo(id = "no_id") {
    return new Promise(async (resolve, reject) => {
      if (id === "no_id" || typeof (id) !== "string" || id.length !== 18) throw new Error("Invalid User ID was provided");

      const data = await get(`user/${id}`);

      if (data.name === "Error") reject("Invalid Bot ID was provided");
      else resolve(data);
    })
  }

  /**
    * An module to get a bot's widget of the botlists.com
    * @param {String} id The bot's ID who' widget you want, If no ID is provided than it will return your client's widget.
    * @returns {Prmoise<String>} Returns the HTML code of the widget. 
  */
  getBotWidget(id = "no_id") {
    return new Promise(async (resolve, reject) => {
      const data = await get(`bot/${id === "no_id" ? this.#client.user.id : id}/widget`, this.#token);

      if (data.name === "Error") reject("Invalid Bot ID was provided");
      else resolve(data);
    })
  }

  /**
   * 
   * @param {String} id The user ID
   * @param {String} token The bot's token
   * @returns {Promise<userVoted} An object.
   */
  userVoted(id, token = "no_token") {
    if (!id || typeof (id) !== "string" || id.length !== 18) throw new Error("Invalid User ID was provided");
    if ((token !== "no_token") && (!token || typeof (token) !== "string" || token.length !== 36)) throw new Error("Invalid Token was provided in userVoted method");

    return new Promise(async (resolve, reject) => {
      const data = await get(`/user/${id}/voted`, token === "no_token" ? this.#token : token, false);

      if (data.error) reject(data);
      else if ("voted" in data && !("votes" in data)) reject({ error: "User not found or User never voted for your bot", status: 404 });
      else resolve(data);
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

/**
 * @typedef {Object} userData The user data on the botlists.com
 * @property {String} username The username on the website.
 * @property {String} description The description on the website.
 * @property {String} image The avatar on the website.
 * @property {Boolean} valid Whether the USER is an valid user or not.
 * @property {Boolean} cache Whether the USER is cached or not.
 */

/**
 * @typedef {Object} userVoted
 * @property {Boolean} voted User voted or not.
 * @property {Number} votes Number of time user voted.
 */