const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'info',
    description: '[DevOnly]',
    devOnly:true,
  
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const guilds = interaction.client.guilds.cache;

        console.log(`Bot is currently in ${guilds.size} guild(s):\n`);

        guilds.forEach(guild => {
            console.log(`Name : ${guild.name} || ID : (${guild.id}) || Total Members : ${guild.memberCount}`);
          });
        
        await interaction.editReply({ content: `check the information at terminal.` });
    },
  };