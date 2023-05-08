const {EmbedBuilder} = require('discord.js');
const clashschedule = require('../../clash-information/schedule.json');

module.exports = {
    name: 'schedule',
    description: 'shows the schedule of upcoming clashes.',
    callback: async (client, interaction) => {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      
      const author = interaction.user;
      const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
      const schedule = clashschedule[0];
      const hexCode = schedule["color"];
      const embedschedule = new EmbedBuilder()
          .setTitle("Clash Information")
          .setDescription(`Here's the clash schedule of **${schedule["id"]}** :\n${schedule["icon"]} **March – Block Builders:** <t:1677816000:F>\n${schedule["icon"]} **April – Fishing Fanatics:** <t:1682049600:F>\n${schedule["icon"]} **May – Surgery Stars:** **To Be Announced (TBA)**\n${schedule["icon"]} **June – Super Startopians:** **To Be Announced (TBA)**\n\nNote : All information above is collected from **Growtopia Official Social Media**`)
          .setColor(parseInt(hexCode, 16))
          .setFooter(
              {
                  text: `${author.username}#${author.discriminator}`,
                  iconURL: `${avatarUrl}`
              }
          )
          .setTimestamp()

        interaction.editReply({ embeds: [embedschedule]});
    },
  };