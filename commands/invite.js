const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["add", "inv"],
  description: "",
  usage: "",
  run: async (client, message, args) => {
    //Start
    const embed = new MessageEmbed()
      .setColor("#3d8eff")
      .setDescription(`[Add Reaction Role in your server](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)

    message.channel.send(embed);

    //End
  }
};
