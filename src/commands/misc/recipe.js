const {EmbedBuilder, ApplicationCommandOptionType} = require('discord.js');
const {getRECIPE} = require('../../../models/recipeModel');

module.exports = {
    name: 'recipe',
    description: 'show a recipe from an elegant and count how much you need it.',
    options: [
        {
            name:'elegant',
                description: 'The Clash Event.',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Anomalizing Elegant Hammer',
                        value: 'hammer',
                    },
                    {
                        name: 'Anomalizing Elegant Trowel',
                        value: 'trowel',
                    },
                    {
                        name: 'Elegant Anomarod',
                        value: 'anomarod',
                    },
                    {
                        name: 'Anomalizing Elegant Scythe',
                        value: 'scythe',
                    },
                    {
                        name: 'Anomalizing Elegant Cultivator',
                        value: 'cultivator',
                    },
                    {
                        name: 'Anomalizing Elegant Bone Saw',
                        value: 'bone-saw',
                    },
                    {
                        name: 'Anomalizing Elegant Rolling Pin',
                        value: 'rolling-pin',
                    },
                    {
                        name: 'Anomalizing Elegant Scanner',
                        value: 'scanner',
                    },
                ],
                required: true,
        },
        {
            name:'number',
            description: 'How much elegant do you want to make?',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        getRECIPE((data) => {
            const author = interaction.user;
            var is_found = false;
            let recipeID = '';
            let recipeelegantname = '';
            let recipe1 = '';
            let recipe1sprite = '';
            let recipe1amount = '';
            let recipe2 = '';
            let recipe2sprite = '';
            let recipe2amount = '';
            let recipe3 = '';
            let recipe3sprite = '';
            let recipe3amount = '';
            let builderroles = '';
            let recipethumbnail = '';

            for(var i = 0; i < data.length; i++) {
                var object = data[i];
                var clash_id = object.id;
                var elegant;
                if(interaction.options.get('elegant').value === clash_id){
                    is_found = true;
                    elegant = object;
                    break;
                }
            }

            if (is_found) {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'decimal',
                });
                const totalelegant = interaction.options.get('number').value;

                recipeID = elegant.id;
                recipeelegantname = elegant.elegantname;
                recipe1 = elegant.recipe1;
                recipe1sprite = elegant.recipe1sprite;
                recipe1amount = elegant.recipe1amount;
                recipe2 = elegant.recipe2;
                recipe2sprite = elegant.recipe2sprite;
                recipe2amount = elegant.recipe2amount;
                recipe3 = elegant.recipe3;
                recipe3sprite = elegant.recipe3sprite;
                recipe3amount = elegant.recipe3amount;
                builderroles = elegant.builderroles;
                recipethumbnail = elegant.thumbnail;

                const countrecipe1 = formatter.format(Math.ceil(recipe1amount*totalelegant));
                const countrecipe2 = formatter.format(Math.ceil(recipe2amount*totalelegant));
                const countrecipe3 = formatter.format(Math.ceil(recipe3amount*totalelegant));
                const desctotalelegant = formatter.format(Math.ceil(totalelegant));

                const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
                const elegantcalc = new EmbedBuilder()
                .setTitle(`Recipe | ${recipeelegantname}`)
                .setDescription(`To make an **${recipeelegantname}** you need **<:Builder:1106202183017431102> Builder Roles** at level **${builderroles}** and three of the items below, then combine them in any **Chemical Combiner** :\n\n**${recipe1amount} ${recipe1sprite} ${recipe1}**\n**${recipe2amount} ${recipe2sprite} ${recipe2}**\n**${recipe3amount} ${recipe3sprite} ${recipe3}**\n\nIf you need **${desctotalelegant} ${recipeelegantname}**, then you need a total of :\n\n**${countrecipe1} ${recipe1sprite} ${recipe1}**\n**${countrecipe2} ${recipe2sprite} ${recipe2}**\n**${countrecipe3} ${recipe3sprite} ${recipe3}**`)
                .setColor(0x72edff)
                .setFooter(
                    {
                        text: `${author.username}#${author.discriminator}`,
                        iconURL: `${avatarUrl}`
                    }
                )
                .setTimestamp()
                .setThumbnail(`${recipethumbnail}`)

            interaction.editReply({ embeds: [elegantcalc]});
            }
        });
    }
};