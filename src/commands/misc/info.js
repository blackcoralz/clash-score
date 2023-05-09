const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'info',
    description: '[DevOnly]',
    devOnly:true,
  
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        // const guilds = interaction.client.guilds.cache;
        // let guildList = '';

        // guilds.forEach(guild => {
        //     guildList += (`${guild.name} (${guild.id})`, `Members: ${guild.memberCount}\n`);
        // });

        // await interaction.editReply(`The bot is currently in ${guilds.size} server(s):\n\n${guildList}`);

        const guilds = interaction.client.guilds.cache;
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Servers')
            .setDescription(`The bot is currently in ${guilds.size} server(s):\n\n`)
            .addFields(
                guilds.map(guild => {
                    return { 
                        name: `${guild.name} (${guild.id})`, 
                        value: `Members: ${guild.memberCount}`,
                        inline: true
                    }
                })
            );
        await interaction.editReply({ embeds: [embed] });
    },
  };