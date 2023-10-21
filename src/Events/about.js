module.exports = async (client, interaction) => {
    await interaction.deferReply();
    const aboutembed = {
        color: 0xb3b3ff,
        title: "About : ",
        description: "WaifuTrade is a bot created for solving the most complexe dispute, waifus trading.",
    }
    interaction.editReply({ embeds: [aboutembed] })
}