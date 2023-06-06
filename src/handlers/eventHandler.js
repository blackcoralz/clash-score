const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const { ActivityType } = require('discord.js');

module.exports = (client) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });

    client.on('ready', (c) => {
      client.user.setActivity({
        name: '/help',
        type: ActivityType.Playing,
      })
    });
  }
};