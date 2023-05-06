const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const clash = require('../../clash-information/clash-score.json');

module.exports = {
    name: 'scores',
        description: 'shows all options of recorded clash scores.',
        options: [
            {
                name: 'clash',
                description: 'The Clash Event.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name:'Surgery Stars Summer Clash 2022',
                        value: 'surgery-summer-2022',
                    },
                    {
                        name:'Speedy Splicers Summer Clash 2022',
                        value: 'splice-summer-2022',
                    },
                    {
                        name:'Block Basher Summer Clash 2022',
                        value: 'basher-summer-2022',
                    },
                    {
                        name:'Super Startopians Winter Clash 2022',
                        value: 'starto-winter-2022',
                    },
                    {
                        name:'Block Builders Spring Clash 2023',
                        value: 'builder-spring-2023',
                    },
                    {
                        name:'Fishing Fanatics Spring Clash 2023',
                        value: 'fish-spring-2023',
                    }
                ],
                required: true,
            }
        ],

    callback: async (client, interaction) => {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      
      
      const author = interaction.user;
      var is_found = false;
      var clashseason;
      for(var i = 0; i < clash.length; i++) {
          var obj = clash[i];
          var clash_id = obj["id"];
          if(interaction.options.get('clash').value === clash_id){
              is_found = true;
              clashseason = obj;
              break;
          }
      }

      if (is_found) {
          const hexCode = clashseason["color"];
          const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
          const embedclash = new EmbedBuilder()
          .setTitle(clashseason["title"])
          .setDescription(`**__Personal__ :**\n1. ${clashseason["personal-1"]} : ${clashseason["personal-1-point"]}\n2. ${clashseason["personal-2"]} : ${clashseason["personal-2-point"]}\n3. ${clashseason["personal-3"]} : ${clashseason["personal-3-point"]}\n4. ${clashseason["personal-4"]} : ${clashseason["personal-4-point"]}\n5. ${clashseason["personal-5"]} : ${clashseason["personal-5-point"]}\n6. ${clashseason["personal-6"]} : ${clashseason["personal-6-point"]}\n7. ${clashseason["personal-7"]} : ${clashseason["personal-7-point"]}\n8. ${clashseason["personal-8"]} : ${clashseason["personal-8-point"]}\n9. ${clashseason["personal-9"]} : ${clashseason["personal-9-point"]}\n10. ${clashseason["personal-10"]} : ${clashseason["personal-10-point"]}\n\n**__Guilds__ :**\n1. ${clashseason["guild-1"]} : ${clashseason["guild-1-point"]}\n2. ${clashseason["guild-2"]} : ${clashseason["guild-2-point"]}\n3. ${clashseason["guild-3"]} : ${clashseason["guild-3-point"]}\n4. ${clashseason["guild-4"]} : ${clashseason["guild-4-point"]}\n5. ${clashseason["guild-5"]} : ${clashseason["guild-5-point"]}\n6. ${clashseason["guild-6"]} : ${clashseason["guild-6-point"]}\n7. ${clashseason["guild-7"]} : ${clashseason["guild-7-point"]}\n8. ${clashseason["guild-8"]} : ${clashseason["guild-8-point"]}\n9. ${clashseason["guild-9"]} : ${clashseason["guild-9-point"]}\n10. ${clashseason["guild-10"]} : ${clashseason["guild-10-point"]}`)
          .setColor(parseInt(hexCode, 16))
          .setFooter(
              {
                  text: `${author.username}#${author.discriminator}`,
                  iconURL: `${avatarUrl}`
              }
          )
          .setTimestamp()
          .setThumbnail(`${clashseason["thumbnail"]}`)

          interaction.editReply({ embeds: [embedclash]});
      }
      else {
          interaction.editReply("Scores are being processed, please call me again in a few minutes.")
      }
    },
  };