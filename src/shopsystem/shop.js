const DbHandler = require("../Db/DbHandler");

module.exports = async (client, interaction) => {
    await interaction.deferReply();
    const result = await DbHandler.shop.aggregate([
        {
            $unwind: "$waifu",
            $unwind: "$cost"
        },
        {
            $group: {
                _id: null,
                waifus: { $push: "$waifu" },
                cost: { $push: "$cost" }
            }
        }
    ]);
    console.log(result)
    if (result[0]) {
        const waifuslist = result[0].waifus.map((waifu, i) => `${i}. ${waifu}  ------>  ${result[0].cost[i]} Karma Points`).join("\r\n")
        const waifushopembed = {
            color: 0xb3b3ff,
            title: `shop :`,
            description: `${waifuslist}`,
        }
        interaction.editReply({ embeds: [waifushopembed] })
    }
    else {
        const waifushopembed = {
            color: 0xb3b3ff,
            title: `shop :`,
            description: "empty",
        }
        interaction.editReply({ embeds: [waifushopembed] })
    }
}