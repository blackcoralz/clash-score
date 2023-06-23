const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'help',
    description: 'shows a list of commands.',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
        
      const embedshelp = new EmbedBuilder()
            .setTitle("List of Commands")
            .setColor(0x72edff)
            .setFields(
                [
                    {
                        name: "/scores [clash]",
                        value: "shows all options of recorded clash scores.",
                    },
                    {
                        name: "/leaderboard",
                        value: "shows scores of recent clash.",
                    },
                    {
                        name: "/schedule",
                        value: "shows the schedule of upcoming clashes.",
                    },
                    {
                        name: "/help",
                        value: "shows a list of commands.",
                    },
                    {
                        name: "/botinfo",
                        value: "shows information about the bot.",
                    },
                    {
                        name: "/clash-information [input]",
                        value: "show the details of a clash.",
                    },
                    {
                        name: "/count [clashevent] [number]",
                        value: "count how much members should contribute on a clash events.",
                    },
                    {
                        name: "/specific-count [clashevent] [point]",
                        value: "count how much members should contribute on a clash events specifically.",
                    },
                    {
                        name: "/recipe [elegant] [number]",
                        value: "show a recipe from an elegant and count how much you need it.",
                    }
                ]
            )
            interaction.editReply({ embeds: [embedshelp]});
    },
  };