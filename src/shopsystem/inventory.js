const DbHandler = require("../Db/DbHandler");

module.exports = async (client, interaction) => {
    await interaction.deferReply();
    const usermention = interaction.options.get("mention-user")?.value;
    const targetuser = usermention || interaction.member.id;
    const fetchtarget = await interaction.guild.members.fetch(targetuser);
    const fetchinventory = await DbHandler.inventory.findOne({
        userId: targetuser,
        guildId: interaction.guild.id,
    })
    if (!fetchinventory) {
        interaction.editReply("We just created you're inventory run the command again")
        const newinventory = new DbHandler.inventory({
            userId: targetuser,
            guildId: interaction.guild.id
        })
        await newinventory.save()
    }
    else {
        const list = fetchinventory.waifu.map((waifu, i) => `${i}. ${waifu}`).join("\r\n")
        const waifuembed = {
            color: 0xb3b3ff,
            title: `${fetchtarget.user.username}'s inventory: `,
            description: `${list ? list : "Empty"}`,
        }
        interaction.editReply({ embeds: [waifuembed] })


    }
}