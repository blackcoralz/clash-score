const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const clashdetail = require('../../clash-information/clash-details.json');

module.exports = {
    name: 'specific-count',
        description: 'count how much members should contribute on a clash events specifically.',
        options: [
            {
                name:'clashevent',
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
            },
            {
                name:'point',
                description: 'How much point do member need to achieve?',
                type: ApplicationCommandOptionType.Number,
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
            if(interaction.options.get('clashevent').value === clash_id){
                is_found = true;
                clashinfo = object;
                break;
            }
        }
        if (is_found) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'decimal',
            });
            const finalanswer = interaction.options.get('point').value;
            
            const elecalc = formatter.format(Math.ceil(finalanswer/clashinfo["elegant-point"]));
            const priscalc = formatter.format(Math.ceil(finalanswer/clashinfo["pristine-point"]));
            const relcalc = formatter.format(Math.ceil(finalanswer/clashinfo["reliable-point"]));
            const elepotion = formatter.format(Math.ceil(finalanswer/(clashinfo["elegant-point"]*1.1)));
            const showfinal = formatter.format(finalanswer);
            const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
            const specificcalc = new EmbedBuilder()
            .setTitle(clashinfo["title"])
            .setDescription(`${clashinfo["information"]}\n\nIf the guild need to achieve **${showfinal} Points**, here's how many guild members need to **${clashinfo["detail2"]}** with anomalizing :\n\n***${clashinfo["elegant-sprite"]} ${clashinfo["elegant-name"]}*** - **${elecalc}** ${clashinfo["detail3"]}\n***${clashinfo["pristine-sprite"]} ${clashinfo["pristine-name"]}*** - **${priscalc}** ${clashinfo["detail3"]}\n***${clashinfo["reliable-sprite"]} ${clashinfo["reliable-name"]}*** - **${relcalc}** ${clashinfo["detail3"]}\n\nIf players use **Elegant Potion** while holding ***${clashinfo["elegant-sprite"]} ${clashinfo["elegant-name"]}*** they need **${elepotion}** ${clashinfo["detail3"]}.`)
            .setColor(0x72edff)
            .setFooter(
                {
                    text: `${author.username}#${author.discriminator}`,
                    iconURL: `${avatarUrl}`
                }
            )
            .setTimestamp()
            .setThumbnail(`${clashinfo["thumbnail"]}`)

            interaction.editReply({ embeds: [specificcalc]});
        }
        },
  };