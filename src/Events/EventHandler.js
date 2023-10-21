const { Commands } = require("../commands/CommandsHandler");
const { mongoose } = require("mongoose");
const canvacord = require("canvacord");
const Level = require("../Levelsystem/Level");
const sell = require("../shopsystem/sell")
const DbHandler = require("../Db/DbHandler");
const CalculateLevel = require("../Levelsystem/CalculateLevel");
const { AttachmentBuilder } = require("discord.js");
const buy = require("../shopsystem/buy");
const shop = require("../shopsystem/shop");
const inventory = require("../shopsystem/inventory");
const profile = require("../Levelsystem/profile");
const daily = require("../Levelsystem/daily");
const add = require("../shopsystem/add");
const help = require("./help");
const about = require("./about");
require("dotenv").config({ path: "../.env" });
module.exports = {
    Events: {
        ready: async (client) => {
            client.on('ready', () => {

                const Guilds = client.guilds.cache.map(guild => guild.id);
                if (Guilds != []) {
                    console.log(Guilds)
                    Commands.registercommands(Guilds, client)
                }
                console.log(`Logged in as ${client.user.tag}!`);
                (async () => {
                    try {
                        await mongoose.connect(process.env.MONGODB, { keepAlive: true })
                        console.log("Connected..")
                    } catch (error) {
                        console.log(error)
                    }
                })();
            });
        },
        botjoin: async (client) => {
            client.on('guildCreate', (guild) => {
                const joinmsg = {
                    author: {
                        name: `${client.user.tag}`
                    },
                    title: `Greetings`,
                    color: 0xb3b3ff,
                    description: "Rules:\n 0- No Spam Commands Please\n 1- no scam\n 2- don't use any flaw",
                    footer: {
                        text: 'have a great time collecting Waifus'
                    },
                    thumbnail: {
                        url: client.user.displayAvatarURL()
                    }
                }
                guild.systemChannel.send({ embeds: [joinmsg] })
            })
        },
        interaction: async (client) => {
            client.on('interactionCreate', async (interaction) => {
                if (!interaction.isChatInputCommand() || !interaction.inGuild()) return;
                if (interaction.commandName === "profile") {
                    profile(client, interaction);
                }
                if (interaction.commandName === "daily") {
                    daily(client, interaction)
                }
                if (interaction.commandName === "inventory") {
                    inventory(client, interaction);
                }
                if (interaction.commandName === "sell") {
                    sell(client, interaction);
                }
                if (interaction.commandName === "buy") {
                    buy(client, interaction);
                }
                if (interaction.commandName === "shop") {
                    shop(client, interaction);
                }
                if (interaction.commandName === "add") {
                    add(client, interaction);
                }
                if (interaction.commandName === "help") {
                    help(client, interaction);
                }
                if (interaction.commandName === "about") {
                    about(client, interaction);
                }
            })
        },
        message: async (client) => {
            client.on('messageCreate', (message) => {
                Level(client, message);
            })
        },
        welcoming: async (client) => {
            client.on('guildMemberAdd', (newmember) => {

                const welcomechannel = newmember.guild.channels.cache.find(channel => channel.name.toLowerCase().includes("welcome"));
                const welcomeembed = {
                    color: 0xb3b3ff,
                    title: `${newmember.user.tag} `,
                    description: `Welcome To The Server ${newmember.user} `,

                    footer: {
                        text: "Who need's a Wife while u can buying a Waifu,have Fun building ur Harem Empire."
                    },
                    thumbnail: {
                        url: newmember.user.displayAvatarURL()
                    }
                }
                welcomechannel.send({ embeds: [welcomeembed] })
            })
        }
    }
}