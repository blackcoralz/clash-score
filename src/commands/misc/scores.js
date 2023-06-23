const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const {getCLASHSCORE} = require('../../../models/clashscoreModel');

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
                },
                {
                    name:'Surgery Stars Spring Clash 2023',
                    value: 'surgery-spring-2023',
                },
                {
                    name:'Super Startopians Spring Clash 2023',
                    value: 'startopia-spring-2023',
                },
            ],
            required: true,
        }
    ],

    callback: async (client, interaction) => {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      
      getCLASHSCORE((data) => {
        let scoreID = '';
        let scoreTitle = '';
        let scorePersonal1 = '';
        let scorePersonal1Point = '';
        let scorePersonal2 = '';
        let scorePersonal2Point = '';
        let scorePersonal3 = '';
        let scorePersonal3Point = '';
        let scorePersonal4 = '';
        let scorePersonal4Point = '';
        let scorePersonal5 = '';
        let scorePersonal5Point = '';
        let scorePersonal6 = '';
        let scorePersonal6Point = '';
        let scorePersonal7 = '';
        let scorePersonal7Point = '';
        let scorePersonal8 = '';
        let scorePersonal8Point = '';
        let scorePersonal9 = '';
        let scorePersonal9Point = '';
        let scorePersonal10 = '';
        let scorePersonal10Point = '';
        let scoreGuild1 = '';
        let scoreGuild1Point = '';
        let scoreGuild2 = '';
        let scoreGuild2Point = '';
        let scoreGuild3 = '';
        let scoreGuild3Point = '';
        let scoreGuild4 = '';
        let scoreGuild4Point = '';
        let scoreGuild5 = '';
        let scoreGuild5Point = '';
        let scoreGuild6 = '';
        let scoreGuild6Point = '';
        let scoreGuild7 = '';
        let scoreGuild7Point = '';
        let scoreGuild8 = '';
        let scoreGuild8Point = '';
        let scoreGuild9 = '';
        let scoreGuild9Point = '';
        let scoreGuild10 = '';
        let scoreGuild10Point = '';
        let scoreColor = '';
        let scoreThumbnail = '';

        const author = interaction.user;
        var is_found = false;
        var clashseason;
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            var clash_id = obj.id;
            if(interaction.options.get('clash').value === clash_id){
                is_found = true;
                clashseason = obj;
                break;
            }
        }

        if (is_found) {
            scoreID = clashseason.id;
            scoreTitle = clashseason.title;
            scorePersonal1 = clashseason.personal1;
            scorePersonal1Point = clashseason.personal1point;
            scorePersonal2 = clashseason.personal2;
            scorePersonal2Point = clashseason.personal2point;
            scorePersonal3 = clashseason.personal3;
            scorePersonal3Point = clashseason.personal3point;
            scorePersonal4 = clashseason.personal4;
            scorePersonal4Point = clashseason.personal4point;
            scorePersonal5 = clashseason.personal5;
            scorePersonal5Point = clashseason.personal5point;
            scorePersonal6 = clashseason.personal6;
            scorePersonal6Point = clashseason.personal6point;
            scorePersonal7 = clashseason.personal7;
            scorePersonal7Point = clashseason.personal7point;
            scorePersonal8 = clashseason.personal8;
            scorePersonal8Point = clashseason.personal8point;
            scorePersonal9 = clashseason.personal9;
            scorePersonal9Point = clashseason.personal9point;
            scorePersonal10 = clashseason.personal10;
            scorePersonal10Point = clashseason.personal10point;
            scoreGuild1 = clashseason.guild1;
            scoreGuild1Point = clashseason.guild1point;
            scoreGuild2 = clashseason.guild2;
            scoreGuild2Point = clashseason.guild2point;
            scoreGuild3 = clashseason.guild3;
            scoreGuild3Point = clashseason.guild3point;
            scoreGuild4 = clashseason.guild4;
            scoreGuild4Point = clashseason.guild4point;
            scoreGuild5 = clashseason.guild5;
            scoreGuild5Point = clashseason.guild5point;
            scoreGuild6 = clashseason.guild6;
            scoreGuild6Point = clashseason.guild6point;
            scoreGuild7 = clashseason.guild7;
            scoreGuild7Point = clashseason.guild7point;
            scoreGuild8 = clashseason.guild8;
            scoreGuild8Point = clashseason.guild8point;
            scoreGuild9 = clashseason.guild9;
            scoreGuild9Point = clashseason.guild9point;
            scoreGuild10 = clashseason.guild10;
            scoreGuild10Point = clashseason.guild10point;
            scoreColor = clashseason.color;
            scoreThumbnail = clashseason.thumbnail;

            const hexCode = scoreColor;

            const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
            const embedclash = new EmbedBuilder()
            .setTitle(scoreTitle)
            .setDescription(`**__Personal__ :**\n1. ${scorePersonal1} : ${scorePersonal1Point}\n2. ${scorePersonal2} : ${scorePersonal2Point}\n3. ${scorePersonal3} : ${scorePersonal3Point}\n4. ${scorePersonal4} : ${scorePersonal4Point}\n5. ${scorePersonal5} : ${scorePersonal5Point}\n6. ${scorePersonal6} : ${scorePersonal6Point}\n7. ${scorePersonal7} : ${scorePersonal7Point}\n8. ${scorePersonal8} : ${scorePersonal8Point}\n9. ${scorePersonal9} : ${scorePersonal9Point}\n10. ${scorePersonal10} : ${scorePersonal10Point}\n\n**__Guilds__ :**\n1. ${scoreGuild1} : ${scoreGuild1Point}\n2. ${scoreGuild2} : ${scoreGuild2Point}\n3. ${scoreGuild3} : ${scoreGuild3Point}\n4. ${scoreGuild4} : ${scoreGuild4Point}\n5. ${scoreGuild5} : ${scoreGuild5Point}\n6. ${scoreGuild6} : ${scoreGuild6Point}\n7. ${scoreGuild7} : ${scoreGuild7Point}\n8. ${scoreGuild8} : ${scoreGuild8Point}\n9. ${scoreGuild9} : ${scoreGuild9Point}\n10. ${scoreGuild10} : ${scoreGuild10Point}`)
            .setColor(parseInt(hexCode, 16))
            .setFooter(
                {
                    text: `${author.username}`,
                    iconURL: `${avatarUrl}`
                }
            )
            .setTimestamp()
            .setThumbnail(`${scoreThumbnail}`)
  
            interaction.editReply({ embeds: [embedclash]});
        }
        else {
            function toTitleCase(str) {
                const words = str.split('-');
                for (let i = 0; i < words.length; i++) {
                  words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
                }
                return words.join(' ');
            }
              
            const tempclash = toTitleCase(interaction.options.get('clash').value);

            interaction.editReply({
                content : `Scores for ${tempclash} are not ready, wait until the clash event is ended. Use **/schedule** to check the up-to-date clash schedule.`
            })
        }
      });
    },
  };