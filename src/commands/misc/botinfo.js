const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'shows information about the bot.',
  
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        function formatUptime(uptime) {
            let days = Math.floor(uptime / 86400);
            let hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);

            if (hours >= 24){
                hours = hours % 24;
            }

            if (days === 1) {
                return `${days} day, ${hours}h ${minutes}m ${seconds}s`;
              } else if (days > 1) {
                return `${days} days, ${hours}h ${minutes}m ${seconds}s`;
              }
                else if (hours > 0) {
                return `${hours}h ${minutes}m ${seconds}s`;
              } else {
                return `${minutes}m ${seconds}s`;
              }
        }
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'decimal',
        });

        let totalMembers = 0;

        client.guilds.cache.forEach(guild => {
            totalMembers += guild.memberCount;
        });


        const author = interaction.user;
        const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
        const embedsinfo = new EmbedBuilder()
            .setAuthor({
                name: `Clash Aibo's Information Details`,
                iconURL: `${client.user.avatarURL()}`
            })
            .setColor(0x72edff)
            .setFields(
                [
                    {
                            name: "Developer",
                            value: "coralz",
                            inline: true
                    },
                    {
                            name: "Servers",
                            value: `${formatter.format(Math.ceil(client.guilds.cache.size))}`,
                            inline: true
                    },
                    {
                            name: "Members",
                            value: `${formatter.format(Math.ceil(totalMembers))}`,
                            inline: true
                    },
                    {
                            name: "Version",
                            value: "1.2.0",
                            inline: true
                    },
                    {
                            name: "Uptime",
                            value: `${formatUptime(process.uptime())}`,
                            inline: true
                    },
                    {
                            name: "Latency",
                            value: `${client.ws.ping} ms`,
                            inline: true
                    }
                ]
            )
            .setFooter(
                {
                    text: `${author.username}`,
                    iconURL: `${avatarUrl}`
                }
            )
            .setTimestamp()
                
            const button1 = new ButtonBuilder()
            .setLabel('Invite Me')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1100052951957000212&permissions=139586776128&scope=bot')
            
            const button2 = new ButtonBuilder()
            .setLabel('Support Me')
            .setStyle(ButtonStyle.Link)
            .setURL('https://linktr.ee/clashaibo')

            const button = new ActionRowBuilder().addComponents(button1, button2);

            interaction.editReply({ embeds: [embedsinfo], components: [button]});
    },
  };