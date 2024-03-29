require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Embed, ButtonBuilder, ButtonStyle, ActionRowBuilder, ActivityType, resolveColor } = require('discord.js');
const { url } = require('inspector');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.TOKEN, ['GUILD_APPLICATION_COMMANDS']);