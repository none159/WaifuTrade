const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { inventory } = require("../Db/DbHandler")
module.exports = async (client, interaction) => {

    const helpembed1 = {
        color: 0xb3b3ff,
        title: "Help",
        description: "Help command guide",
        fields: [
            {
                name: 'page 1',
                value: 'profile related commands',
            },

            {
                name: 'page 2',
                value: 'trading related commands',

            },
            {
                name: 'page 3',
                value: 'other commands',

            }
        ],

    }
    const helpembed2 = {
        color: 0xb3b3ff,
        title: "Profile commands :",
        fields: [
            {
                name: '/profile',
                value: "get information about you're profile",
            },

            {
                name: '/daily',
                value: "claim you're daily amount of karma points",

            }],

    }
    const helpembed3 = {
        color: 0xb3b3ff,
        title: "Trading commands : ",

        fields: [
            {
                name: '/inventory',
                value: "show you're inventory",
                inline: true,
            },
            {
                name: '/shop',
                value: 'get list of waifus selling in the shop',
            },

            {
                name: '/buy',
                value: "buy waifu from the shop",

            },
            {
                name: '/sell',
                value: "sell a waifu on the shop"

            },
            {
                name: '/add',
                value: "add a waifu to you're inventory",

            }
        ],

    }
    const helpembed4 = {
        color: 0xb3b3ff,
        title: "Other commands : ",

        fields: [
            {
                name: '/help',
                value: 'get list of commands',

            },
            { name: '/about', value: 'learn about the bot' }
        ]
    }

    const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder().setCustomId('page 1').setLabel('page 1').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('page 2').setLabel('page 2').setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId('page 3').setLabel('page 3').setStyle(ButtonStyle.Success),
        )
    const message = await interaction.reply({ embeds: [helpembed1], components: [button] })
    const collector = await message.createMessageComponentCollector();
    collector.on('collect', async (i) => {
        if (i.customId === "page 1") {
            if (i.user.id != interaction.user.id) {
                return i.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true })
            }
            await i.reply({ embeds: [helpembed2], components: [button] })
        }
        if (i.customId === "page 2") {
            if (i.user.id != interaction.user.id) {
                return i.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true })
            }
            await i.reply({ embeds: [helpembed3], components: [button] })
        }
        if (i.customId === "page 3") {
            if (i.user.id != interaction.user.id) {
                return i.reply({ content: `only ${interaction.user.tag} can use these buttons`, ephemeral: true })
            }
            await i.reply({ embeds: [helpembed4], components: [button] })
        }
    })
}