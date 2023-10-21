const DbHandler = require('../Db/DbHandler');
const CalculateLevel = require('./CalculateLevel');
const { Client, message } = require('discord.js');
const cooldown = new Set();


const Generatexp = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports = async (client, message) => {
    if (!message.inGuild() || message.author.bot || cooldown.has(message.author.id)) return;
    const xptoGive = Generatexp(5, 15);
    const query = {
        userId: message.author.id,
        guildId: message.guild.id,
    };
    try {
        const level = await DbHandler.level.findOne(query);
        const karmapoints = await DbHandler.karma.findOne(query);
        if (level) {
            level.xp += xptoGive
            const karmagained = 100;
            if (karmapoints) {
                if (level.xp > CalculateLevel(level.level)) {
                    level.xp = 0
                    level.level += 1
                    karmapoints.karma += karmagained;
                    const levelupembed = {
                        color: 0xb3b3ff,
                        title: `${message.author.tag} LEVEL UP TO **${level.level}** You Gained **${karmagained}** Karma Points`,
                        description: "You don't need to level up in real life when u can here",
                        thumbnail: {
                            url: message.author.displayAvatarURL()
                        }
                    }
                    message.channel.send({ embeds: [levelupembed] })

                }
                await karmapoints.save().catch((error) => {
                    console.log(error)
                    return;
                })
                await level.save().catch((error) => {
                    console.log(error)
                    return;
                })
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, 50000)
            }
            else {
                const createnewkarma = new DbHandler.karma({
                    userId: message.author.id,
                    guildId: message.guild.id,
                    karma: karmagained,
                })
                await createnewkarma.save();
                cooldown.add(message.author.id);
                setTimeout(() => {
                    cooldown.delete(message.author.id);
                }, 50000)
            }
        }
        else {
            console.log('run')
            const createnewlevel = new DbHandler.level({
                userId: message.author.id,
                guildId: message.guild.id,
                xp: xptoGive,
            })
            await createnewlevel.save();
            cooldown.add(message.author.id);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, 50000)
        }

    } catch (err) {
        console.log(err);
    }

};