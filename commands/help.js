const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: [],
  description: "",
  usage: "",
  run: async (client, message, args) => {
    //Start
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`**Reaction Commands**\n\`👥\` \`rr!add <#channeL> <MESSAGEID> <@ROLE> <EMOJI>\`\n*Make a reaction that gives out a role when you react!*\n\`👤\` \`rr!delete <MESSAGEID> <EMOJI>\`\n*Remove your reaction roles*\n**Information Commands**\n\`🏓\` \`rr!ping\`\n*Gives you information on how fast the Bot can respond to you*\n\`📝\` \`rr!help\`\n*A list of my commands!*\n\`✉️\` \`invite\`\n*Invite Reaction role invite server*`)

    message.channel.send(embed);

    //End
  }
};
