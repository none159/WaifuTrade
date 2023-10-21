const canvacord = require("canvacord");
const DbHandler = require("../Db/DbHandler");
const CalculateLevel = require("./CalculateLevel");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (client, interaction) => {
    await interaction.deferReply();
    try {
        const usermention = interaction.options.get("mention-user")?.value;
        const targetuser = usermention || interaction.member.id;
        const fetchtarget = await interaction.guild.members.fetch(targetuser);
        const fetchlevel = await DbHandler.level.findOne({
            userId: targetuser,
            guildId: interaction.guild.id,
        })
        if (!fetchlevel) {
            interaction.editReply(
                usermention ? `${fetchtarget.user.tag} doesn't have any level , he still a humain being.` : `you don't have any level , still a humain being.`
            )
            return;
        }
        let alllevels = await DbHandler.level.find({ guildId: interaction.guild.id }).select("-_id userId level xp")
        alllevels.sort((a, b) => {
            if (a.level === b.level) {
                return b.xp - a.xp;
            }
            else {
                return b.level - a.level;
            }
        })
        let currentrank = alllevels.findIndex((lvl) => lvl.userId === targetuser) + 1;
        const rank = new canvacord.Rank().setAvatar(fetchtarget.user.displayAvatarURL({ size: 256 }))
            .setRank(currentrank)
            .setLevel(fetchlevel.level)
            .setCurrentXP(fetchlevel.xp)
            .setRequiredXP(CalculateLevel(fetchlevel.level))
            .setStatus(fetchtarget.presence.status)
            .setProgressBar(["#d31777", "#ff0084"], 'GRADIENT', true)
            .setBackground("COLOR", "#b3b3ff")
            .setUsername(fetchtarget.user.username)
            .setDiscriminator(fetchtarget.user.discriminator)
        const data = await rank.build()
        const attachement = new AttachmentBuilder(data);
        interaction.editReply({ files: [attachement] })
    } catch (error) {
        console.log(error)

    }
}
