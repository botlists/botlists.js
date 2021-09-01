# Installations
```
npm i botlists.js
```

# What ?
This package is for automatically sending your bot's server count to the botlists.com

# How ?
```js
// Define the client and other stuff

const botlist = require('botlists.js');
const token = "your-token";

/**
 * An module to auto send your server counts to botlists.com
 * @param {Discord.Client} client Your Discord Bot Client
 * @param {String} token Your Bot's Token for Website API
 * @param {Number} timeout Timeinterval between sending server count
 * @param {Boolean} disableConsole Whether you want console logs or not
 */
botlist(client, token, false).then((message)=>{
    // Success
    console.log(message);
}).catch((e)=>{
    // Failed
    console.log(e);
})
```

# Support
If you have any issue with the package contact us on [Support Server](https://discord.gg/mGsvDGRyyq).
