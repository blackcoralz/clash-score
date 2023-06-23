const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const {getCLASHDETAIL} = require('../../../models/clashdetailsModel');

module.exports = {
    name: 'count',
        description: 'count how much members should contribute on a clash events.',
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
                name:'number',
                description: 'How much point do member need to achieve? #20 x [number]',
                type: ApplicationCommandOptionType.Number,
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

            for(var i = 0; i < data.length; i++) {
                var object = data[i];
                var clash_id = object.id;
                var clashdetail;
                if(interaction.options.get('clashevent').value === clash_id){
                    is_found = true;
                    clashdetail = object;
                    break;
                }
            }
            
            if (is_found) {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                });

                clashdetailID = clashdetail.id;
                clashdetail20info = clashdetail.info;
                clashdetail20personal = clashdetail.personal;
                clashdetailTitle = clashdetail.title;
                clashdetailInformation = clashdetail.information;
                clashdetailElegantName = clashdetail.elegantname;
                clashdetailPristineName = clashdetail.pristinename;
                clashdetailReliableName = clashdetail.reliablename;
                clashdetailElegantSprite = clashdetail.elegantsprite;
                clashdetailPristineSprite = clashdetail.pristinesprite;
                clashdetailReliableSprite = clashdetail.reliablesprite;
                clashdetailElegantPoint = clashdetail.elegantpoint;
                clashdetailPristinePoint = clashdetail.pristinepoint;
                clashdetailReliablePoint = clashdetail.reliablepoint;
                clashdetailDetail1 = clashdetail.detail1;
                clashdetailDetail2 = clashdetail.detail2;
                clashdetailDetail3 = clashdetail.detail3;
                clashdetailThumbnail = clashdetail.thumbnail;

                const personal = clashdetail20personal;
                const target = interaction.options.get('number').value;
                const finalanswer = personal*target;

                const elecalc = formatter.format(Math.ceil(finalanswer/clashdetailElegantPoint));
                const priscalc = formatter.format(Math.ceil(finalanswer/clashdetailPristinePoint));
                const relcalc = formatter.format(Math.ceil(finalanswer/clashdetailReliablePoint));
                const elepotion = formatter.format(Math.ceil(finalanswer/(clashdetailElegantPoint*1.1)));
                const showfinal = formatter.format(finalanswer);
                const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
                const calculation = new EmbedBuilder()
                    .setTitle(clashdetailTitle)
                    .setDescription(`${clashdetailInformation}\n\nIf the guild need to achieve **#20x${target}** or **${showfinal} Points**, here's how many guild members need to **${clashdetailDetail2}** with anomalizing :\n\n***${clashdetailElegantSprite} ${clashdetailElegantName}*** - **${elecalc}** ${clashdetailDetail3}\n***${clashdetailPristineSprite} ${clashdetailPristineName}*** - **${priscalc}** ${clashdetailDetail3}\n***${clashdetailReliableSprite} ${clashdetailReliableName}*** - **${relcalc}** ${clashdetailDetail3}\n\nIf players use **<:ElegantPotion:1105928353363525764> Elegant Potion** while holding ***${clashdetailElegantSprite} ${clashdetailElegantName}*** they need **${elepotion}** ${clashdetailDetail3}.`)
                    .setColor(0x72edff)
                    .setFooter(
                        {
                            text: `${author.username}`,
                            iconURL: `${avatarUrl}`
                        }
                    )
                    .setTimestamp()
                    .setThumbnail(`${clashdetailThumbnail}`)

            interaction.editReply({ embeds: [calculation]});
            }
        });
        },
  };