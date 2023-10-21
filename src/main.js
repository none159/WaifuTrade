require('dotenv').config();
const { Events } = require('./Events/EventHandler');
const token = process.env.MONGODB
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, 'Guilds', 'GuildMessages', 'MessageContent', "GuildMembers", "GuildPresences"] });
client.login(process.env["TOKEN_DISC"]);
Events.ready(client);
Object.keys(Events).forEach((key, index) => Events[key](client))

