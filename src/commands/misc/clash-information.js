const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const {getCLASHDETAIL} = require('../../../models/clashdetailsModel');

module.exports = {
    name: 'clash-information',
        description: 'shows the details of a clash events.',
        options: [
            {
                name:'input',
                description: 'The Clash Event.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Block Bashers',
                        value: 'block-bashers',
                    },
                    {
                        name: 'Block Builders',
                        value: 'block-builders',
                    },
                    {
                        name: 'Fishing Fanatics',
                        value: 'fishing-fanatics',
                    },
                    {
                        name: 'Harvest Heroes',
                        value: 'harvest-heroes',
                    },
                    {
                        name: 'Speedy Splicers',
                        value: 'speedy-splicers',
                    },
                    {
                        name: 'Surgery Stars',
                        value: 'surgery-stars',
                    },
                    {
                        name: 'Cooking Conquerors',
                        value: 'cooking-conquerors',
                    },
                    {
                        name: 'Super Startopians',
                        value: 'super-startopians',
                    }
                ],
                required: true,
            }
        ],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        
        getCLASHDETAIL((data) => {
            const author = interaction.user;
            var is_found = false;
            let clashdetailID = '';
            let clashdetail20info = '';
            let clashdetail20personal = '';
            let clashdetailTitle = '';
            let clashdetailInformation = '';
            let clashdetailElegantName = '';
            let clashdetailPristineName = '';
            let clashdetailReliableName = '';
            let clashdetailElegantSprite = '';
            let clashdetailPristineSprite = '';
            let clashdetailReliableSprite = '';
            let clashdetailElegantPoint = '';
            let clashdetailPristinePoint = '';
            let clashdetailReliablePoint = '';
            let clashdetailDetail1 = '';
            let clashdetailDetail2 = '';
            let clashdetailDetail3 = '';
            let clashdetailThumbnail = '';
            var is_found = false;
            var clashinfo;

            for(var i = 0; i < data.length; i++) {
                var object = data[i];
                var clash_id = object.id;
                var clashinfo;
                if(interaction.options.get('input').value === clash_id){
                    is_found = true;
                    clashinfo = object;
                    break;
                }
            }

            if (is_found) {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                });

                clashdetailID = clashinfo.id;
                clashdetail20info = clashinfo.info;
                clashdetail20personal = clashinfo.personal;
                clashdetailTitle = clashinfo.title;
                clashdetailInformation = clashinfo.information;
                clashdetailElegantName = clashinfo.elegantname;
                clashdetailPristineName = clashinfo.pristinename;
                clashdetailReliableName = clashinfo.reliablename;
                clashdetailElegantSprite = clashinfo.elegantsprite;
                clashdetailPristineSprite = clashinfo.pristinesprite;
                clashdetailReliableSprite = clashinfo.reliablesprite;
                clashdetailElegantPoint = clashinfo.elegantpoint;
                clashdetailPristinePoint = clashinfo.pristinepoint;
                clashdetailReliablePoint = clashinfo.reliablepoint;
                clashdetailDetail1 = clashinfo.detail1;
                clashdetailDetail2 = clashinfo.detail2;
                clashdetailDetail3 = clashinfo.detail3;
                clashdetailThumbnail = clashinfo.thumbnail;

                const elecalc = formatter.format(Math.ceil(clashdetail20personal/clashdetailElegantPoint));
                const priscalc = formatter.format(Math.ceil(clashdetail20personal/clashdetailPristinePoint));
                const relcalc = formatter.format(Math.ceil(clashdetail20personal/clashdetailReliablePoint));
                const elepotion = formatter.format(Math.ceil(clashdetail20personal/(clashdetailElegantPoint*1.1)));
                const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
                const clashdetail = new EmbedBuilder()
                .setTitle(clashdetailTitle)
                .setDescription(`${clashdetailInformation}\n\nIn each Grow Event, appropriate tools must be used in order to score points. All tools have a chance of breaking and turning into a lower tier tool, except for Reliable tools (or Delicate equivalent). Higher-tier tools will yield points faster.\n\n***${clashdetailElegantSprite} ${clashdetailElegantName}*** - ${formatter.format(clashdetailElegantPoint)} points\n***${clashdetailPristineSprite} ${clashdetailPristineName}*** - ${formatter.format(clashdetailPristinePoint)} points\n***${clashdetailReliableSprite} ${clashdetailReliableName}*** - ${formatter.format(clashdetailReliablePoint)} points\n\nEach Grow Event has its own personal rewards. By earning a certain number of points, a maximum of 20 personal rewards can be claimed. Seasonal tokens are obtainable from each reward and special chests are obtainable from every 5th reward. Personal Event leaderboards stay up for the entire month that the Grow Event is running for and players have three days from the end of the month to claim their rewards.\n\nPlayers need a certain amount of points to get all rewards (#20 Personal [**${clashdetail20info} Points**])\nFor **${clashdetailDetail1}**, players need to **${clashdetailDetail2}** with anomalizing :\n\n***${clashdetailElegantSprite} ${clashdetailElegantName}*** - **${elecalc}** ${clashdetailDetail3}\n***${clashdetailPristineSprite} ${clashdetailPristineName}*** - **${priscalc}** ${clashdetailDetail3}\n***${clashdetailReliableSprite} ${clashdetailReliableName}*** - **${relcalc}** ${clashdetailDetail3}\n\nIf players use **<:ElegantPotion:1105928353363525764> Elegant Potion** while holding ***${clashdetailElegantSprite} ${clashdetailElegantName}*** they need **${elepotion}** ${clashdetailDetail3}.`)
                .setColor(0x72edff)
                .setFooter(
                    {
                        text: `${author.username}#${author.discriminator}`,
                        iconURL: `${avatarUrl}`
                    }
                )
                .setTimestamp()
                .setThumbnail(`${clashdetailThumbnail}`)
    
                interaction.editReply({ embeds: [clashdetail]});
            }
        });
        },
  };