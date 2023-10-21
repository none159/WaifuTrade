require('dotenv').config({ path: "../.env" });
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    Commands: {
        registercommands: async (guild, client) => {
            const commands = [{
                name: "profile",
                description: "get you're or a user level",
                options: [
                    {
                        name: "mention-user",
                        description: "The user whose level you want to see",
                        type: ApplicationCommandOptionType.Mentionable,
                    }
                ]
            }, {
                name: "daily",
                description: "get you're daily Karma points",

            },
            {
                name: "inventory",
                description: "get list of waifus you bought.",
                options: [{
                    name: "mention-user",
                    description: "the user whose waifus you want to see.",
                    type: ApplicationCommandOptionType.Mentionable,
                }]
            }, {
                name: "shop",
                description: "open shop.",

            },
            {
                name: "sell",
                description: "sell a waifu",
                options: [
                    {
                        name: "select-waifu",
                        description: "type the name of waifu you want to sell.",
                        type: ApplicationCommandOptionType.Number
                    }
                    , {
                        name: "cost",
                        description: "waifu cost",
                        type: ApplicationCommandOptionType.Number,
                    }
                ]
            },
            {
                name: "buy",
                description: "buy a waifu",
                options: [{
                    name: "select-waifu",
                    description: "type the number of waifu you want to buy.",
                    type: ApplicationCommandOptionType.Number,
                }]
            }, {
                name: "add",
                description: "add waifu to inventory",
                options: [{
                    name: "waifu-name",
                    description: "type waifu name",
                    type: ApplicationCommandOptionType.String,
                }]
            },
            {
                name: "help",
                description: "get information about the bot and commands"
            },
            {
                name: "about",
                description: "information about the bot"
            }
            ]

            const rest = new REST({ version: "10" }).setToken(process.env["TOKEN_DISC"]);
            (async () => {
                try {
                    console.log(`Started refreshing ${commands.length} application (/) commands.`);
                    const data = await rest.put(
                        Routes.applicationCommands(process.env["BOTID"]),
                        { body: commands },
                    );

                    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
                } catch (error) {

                    console.error(error);
                }
            })();
        },


    }

}