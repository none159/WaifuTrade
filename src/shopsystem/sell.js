const DbHandler = require("../Db/DbHandler");

module.exports = async (client, interaction) => {

    await interaction.deferReply();
    const waifu = interaction.options.get("select-waifu")?.value;
    const cost = interaction.options.get("cost")?.value;
    const fetchinventory = await DbHandler.inventory.findOne({
        userId: interaction.member.id,
        guildId: interaction.guild.id,
    })
    const fetchshop = await DbHandler.shop.findOne({
        userId: interaction.member.id,
        guildId: interaction.guild.id,
    })

    if (waifu && fetchinventory.waifu[waifu - 1] != undefined && fetchinventory && fetchshop) {
        const waifulist = fetchshop.waifu;
        const costlist = fetchshop.cost;
        costlist.push(cost)
        waifulist.push(fetchinventory.waifu[waifu - 1])
        const updateshop = await DbHandler.shop.findOneAndUpdate({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        }, { cost: costlist, waifu: waifulist })
        const updateinventory = await DbHandler.inventory.findOneAndUpdate({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        }, {
            waifu: fetchinventory.waifu.filter((value, index, arr) => {
                return value !== fetchinventory.waifu[waifu - 1] && index != fetchinventory.waifu.indexOf(fetchinventory.waifu[waifu - 1]);
            })
        })
        await updateshop.save()
        await updateinventory.save()
        interaction.editReply("You sold it, to buy it use command shop and buy.")
    }
    if (fetchinventory.waifu[waifu - 1] === undefined) {
        interaction.editReply("This waifu doesn't exist.")
    }
    if (!fetchinventory) {
        interaction.editReply("We just created you're inventory run the command again")
        const newinventory = new DbHandler.inventory({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        })
        await newinventory.save();
    }
    if (!fetchshop) {
        interaction.editReply("We just created you're shop run the command again")
        const newshop = new DbHandler.shop({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        })
        await newshop.save();
    }


}