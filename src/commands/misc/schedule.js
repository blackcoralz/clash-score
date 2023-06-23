const {EmbedBuilder} = require('discord.js');
const {getSCHEDULE} = require('../../../models/scheduleModel');

module.exports = {
    name: 'schedule',
    description: 'shows the schedule of upcoming clashes.',

    callback: async (client, interaction) => {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      getSCHEDULE((data) => {
        let scheduleColor = '';
        let scheduleFirst = '';
        let scheduleFirstDate = '';
        let scheduleSecond = '';
        let scheduleSecondDate = '';
        let scheduleThird = '';
        let scheduleThirdDate = '';
        let scheduleFourth = '';
        let scheduleFourthDate = '';
        let scheduleID = '';
        let scheduleIcon = '';

        Object.keys(data).map((key) => {
          scheduleColor = data[key].color;
          scheduleFirst = data[key].first;
          scheduleFirstDate = data[key].first_date;
          scheduleSecond = data[key].second;
          scheduleSecondDate = data[key].second_date;
          scheduleThird = data[key].third;
          scheduleThirdDate = data[key].third_date;
          scheduleFourth = data[key].fourth;
          scheduleFourthDate = data[key].fourth_date;
          scheduleID = data[key].id;
          scheduleIcon = data[key].icon;
        });
        const author = interaction.user;
        const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
        const hexCode = scheduleColor;

        const embedschedule = new EmbedBuilder()
        .setTitle("Clash Information")
        .setDescription(`Here's the clash schedule of **${scheduleID}** :\n${scheduleIcon} **${scheduleFirst}:** ${scheduleFirstDate}\n${scheduleIcon} **${scheduleSecond}:** ${scheduleSecondDate}\n${scheduleIcon} **${scheduleThird}:** ${scheduleThirdDate}\n${scheduleIcon} **${scheduleFourth}:** ${scheduleFourthDate}\n\nNote : All information above is collected from **Growtopia Official Social Media**`)
        .setColor(parseInt(hexCode, 16))
        .setFooter(
            {
                text: `${author.username}`,
                iconURL: `${avatarUrl}`
            }
        )
        .setTimestamp()

      interaction.editReply({ embeds: [embedschedule]});
      });
    },
  };