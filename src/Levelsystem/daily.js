
const DbHandler = require("../Db/DbHandler");

module.exports = async (client, interaction) => {
    await interaction.deferReply();
    const dailyamount = 1000;
    const query = {
        userId: interaction.member.id,
        guildId: interaction.guild.id,
    };
    let karmatable = await DbHandler.karma.findOne(query);
    if (karmatable) {
        console.log('run')
        const lastdaily = karmatable.lastdaily.toDateString();
        const currentdaily = new Date().toDateString();
        console.log(lastdaily)
        console.log(currentdaily)
        if (lastdaily === currentdaily) {

            interaction.editReply("You have already collected you're daily today.");
            return;
        }

    }
    if (!karmatable) {
        karmatable = new DbHandler.karma({
            ...query,
            lastdaily: new Date(),
        })
    }
    karmatable.karma += dailyamount;
    await karmatable.save();
    interaction.editReply(`You have received your daily amount of karma **${dailyamount}** Karma points`);
}