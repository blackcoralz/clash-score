const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const clashdetail = require('../../clash-information/clash-details.json');

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
        
        
        const author = interaction.user;
        var is_found = false;
        var clashinfo;
        for(var i = 0; i < clashdetail.length; i++) {
            var object = clashdetail[i];
            var clash_id = object["id"];
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
            const elecalc = formatter.format(Math.ceil(clashinfo["20personal"]/clashinfo["elegant-point"]));
            const priscalc = formatter.format(Math.ceil(clashinfo["20personal"]/clashinfo["pristine-point"]));
            const relcalc = formatter.format(Math.ceil(clashinfo["20personal"]/clashinfo["reliable-point"]));
            const elepotion = formatter.format(Math.ceil(clashinfo["20personal"]/(clashinfo["elegant-point"]*1.1)));
            const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
            const clashdetail = new EmbedBuilder()
            .setTitle(clashinfo["title"])
            .setDescription(`${clashinfo["information"]}\n\nIn each Grow Event, appropriate tools must be used in order to score points. All tools have a chance of breaking and turning into a lower tier tool, except for Reliable tools (or Delicate equivalent). Higher-tier tools will yield points faster.\n\n***${clashinfo["elegant-sprite"]} ${clashinfo["elegant-name"]}*** - ${formatter.format(clashinfo["elegant-point"])} points\n***${clashinfo["pristine-sprite"]} ${clashinfo["pristine-name"]}*** - ${formatter.format(clashinfo["pristine-point"])} points\n***${clashinfo["reliable-sprite"]} ${clashinfo["reliable-name"]}*** - ${formatter.format(clashinfo["reliable-point"])} points\n\nEach Grow Event has its own personal rewards. By earning a certain number of points, a maximum of 20 personal rewards can be claimed. Seasonal tokens are obtainable from each reward and special chests are obtainable from every 5th reward. Personal Event leaderboards stay up for the entire month that the Grow Event is running for and players have three days from the end of the month to claim their rewards.\n\nPlayers need a certain amount of points to get all rewards (#20 Personal [**${clashinfo["20info"]} Points**])\nFor **${clashinfo["detail1"]}**, players need to **${clashinfo["detail2"]}** with anomalizing :\n\n***${clashinfo["elegant-sprite"]} ${clashinfo["elegant-name"]}*** - **${elecalc}** ${clashinfo["detail3"]}\n***${clashinfo["pristine-sprite"]} ${clashinfo["pristine-name"]}*** - **${priscalc}** ${clashinfo["detail3"]}\n***${clashinfo["reliable-sprite"]} ${clashinfo["reliable-name"]}*** - **${relcalc}** ${clashinfo["detail3"]}\n\nIf players use **Elegant Potion** while holding ***${clashinfo["elegant-sprite"]} ${clashinfo["elegant-name"]}*** they need **${elepotion}** ${clashinfo["detail3"]}.`)
            .setColor(0x72edff)
            .setFooter(
                {
                    text: `${author.username}#${author.discriminator}`,
                    iconURL: `${avatarUrl}`
                }
            )
            .setTimestamp()
            .setThumbnail(`${clashinfo["thumbnail"]}`)

            interaction.editReply({ embeds: [clashdetail]});
        }
        },
  };