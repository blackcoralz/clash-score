const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'shows information about the bot.',
  
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        function formatUptime(uptime) {
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            return `${hours}h ${minutes}m ${seconds}s`;
        }

        let totalMembers = 0;

        client.guilds.cache.forEach(guild => {
            totalMembers += guild.memberCount;
        });


        const author = interaction.user;
        const avatarUrl = author.avatar !== null ? author.avatarURL() : "https://cdn.discordapp.com/attachments/682109891275522071/1103912522593075230/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png";
        const embedsinfo = new EmbedBuilder()
            .setTitle("Clash Aibo's Detail")
            .setColor(0x72edff)
            .setFields(
                [
                    {
                            name: "Developer",
                            value: "Coralz#0076",
                            inline: true
                    },
                    {
                            name: "Servers",
                            value: `${client.guilds.cache.size}`,
                            inline: true
                    },
                    {
                            name: "Members",
                            value: `${totalMembers}`,
                            inline: true
                    },
                    {
                            name: "Version",
                            value: "1.0",
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
                    text: `${author.username}#${author.discriminator}`,
                    iconURL: `${avatarUrl}`
                }
            )
            .setTimestamp()
                
            const button = new ButtonBuilder()
            .setLabel('Invite Bot')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1100052951957000212&permissions=9057147026657&scope=bot%20applications.commands')

            const row = new ActionRowBuilder().addComponents(button);

            interaction.editReply({ embeds: [embedsinfo], components: [row]});
    },
  };