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
    const fetchkarma = await DbHandler.karma.findOne({
        userId: interaction.member.id,
        guildId: interaction.guild.id,
    })
    if (waifu && fetchshop.waifu[waifu - 1] != undefined && fetchkarma.karma >= fetchshop.cost[waifu - 1] && fetchinventory && fetchshop) {
        const waifulist = fetchinventory.waifu;
        fetchkarma.karma -= fetchshop.cost[waifu - 1]
        waifulist.push(fetchshop.waifu[waifu - 1])
        const updateinventory = await DbHandler.inventory.findOneAndUpdate({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        }, { waifu: waifulist })
        const updateshop = await DbHandler.shop.findOneAndUpdate({
            userId: interaction.member.id,
            guildId: interaction.guild.id,
        }, {
            cost: fetchshop.cost.filter((value, index, arr) => {
                return value !== fetchshop.cost[waifu - 1] && index != fetchshop.cost.indexOf(fetchshop.cost[waifu - 1]);
            })
            ,
            waifu: fetchshop.waifu.filter((value, index, arr) => {
                return value !== fetchshop.waifu[waifu - 1] && index != fetchshop.waifu.indexOf(fetchshop.waifu[waifu - 1]);
            })
        })
        await updateshop.save();
        await updateinventory.save();
        await fetchkarma.save();
        interaction.editReply("You bought it,to resell it use sell command and number of waifu.")
    }
    if (fetchshop.waifu[waifu - 1] === undefined) {
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