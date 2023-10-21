const DbHandler = require("../Db/DbHandler")

module.exports = async (client, interaction) => {
    await interaction.deferReply();
    const waifu = interaction.options.get("waifu-name")?.value;

    const fetchinventory = await DbHandler.inventory.findOne({
        userId: interaction.member.id,
        guildId: interaction.guild.id,
    })

    if (waifu && fetchinventory) {
        const waifulist = fetchinventory.waifu;
        waifulist.push(waifu)
        const updateinventory = await DbHandler.inventory.findOneAndUpdate({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        }, { waifu: waifulist })


        await updateinventory.save();
        interaction.editReply("You added the waifu to you're inventory,to display all you're waifus run inventory command.")
    }

    if (!fetchinventory) {
        interaction.editReply("We just created you're inventory run the command again")
        const newinventory = new DbHandler.inventory({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        })
        await newinventory.save();
    }


}
