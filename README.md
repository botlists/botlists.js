# Installations
```
npm i botlists.js
```

# What ?
This package is for using the bot lists api for sending server count, getting bots info and more.

# How ?
```js
// Define the client and other stuff

const Botlist = require('botlists.js');
const token = "your-token";

/**
 * An module to auto send your server counts to botlists.com
 * @param {Discord.Client} client Your Discord Bot Client
 * @param {String} token Your Bot's Token for Website API
 * @param {Number} timeout Timeinterval between sending server count
 * @param {Boolean} disableConsole Whether you want console logs or not
 */
const botlist = new Botlist(client, token, true);

// To start auto server count sender
botlist.autoCounter().then((v)=>{
    // Success
    console.log(v)
}).catch(e=>{
    //Fail
    console.log(e)
});

// To get a bot's info on the website.
botlist.getBotInfo("some bot ID, if no ID than your bot's info is returned").then(v=>{
    // The bot's data
    console.log(v);
}).catch(e=>{
    // Fail
    console.log(e)
});

// To get a bot's widget on the website.
botlist.getBotWidget("some bot ID, if no ID than your bot's widget is returned").then(v=>{
    // The bot's widget's HTML code.
    console.log(v);
}).catch(e=>{
    // Fail
    console.log(e)
});

// To get a user's info on the website.
botlist.getUserInfo("User ID").then(v=>{
    // The user's data
    console.log(v);
}).catch(e=>{
    // Fail
    console.log(e)
});
```

# Support
If you have any issue with the package contact us on [Support Server](https://discord.gg/mGsvDGRyyq).