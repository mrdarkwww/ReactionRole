const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: [],
  description: "Pong!",
  usage: "Ping",
  run: async (client, message, args) => {
    //Start
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`\`🟢 ${client.ws.ping}\``)

    message.channel.send(embed);

    //End
  }
};