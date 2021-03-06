const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const { Database } = require('quickmongo');
const config = require('./config.json');
const discord = require('discord.js');
const emotfe = require('./emojis.json');
const db = new Database(config.database);
const prefix = config.prefix;
db.on('ready', () => {
	console.log('Database connected!');
});
client.on('ready', () => {
	console.log('App Connected! ', client.user.tag);
});
client.commands = new Discord.Collection();

const { join } = require('path');
const { readdirSync } = require('fs');
const { O_RDONLY, S_IFMT } = require('constants');
const { count } = require('console');
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file =>
	file.endsWith('.js')
);

for (const file of commandFiles) {
	const command = require(join(__dirname, 'commands', `${file}`));
	client.commands.set(command.name, command);
}

client.on('message', async message => {
	let prefix = config.prefix;
	if (message.author.bot) return;
	if (message.channel.type === 'dm') return;
	if (message.content.startsWith(prefix)) {
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/);

		const command = args.shift().toLowerCase();

		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).run(client, message, args, db, prefix);
		} catch (error) {
			console.error(error);
		}
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.partial) await user.fetch();
	if (reaction.partial) await reaction.fetch();
	if (reaction.message.partial) await reaction.message.fetch();
	if (user.bot) return;
	let emote = await db.get(
		`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!emote) return;
	let messageid = await db.get(
		`message_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!messageid) return;
	let role = await db.get(
		`role_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!role) return;

	if (reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
		reaction.message.guild.members.fetch(user).then(member => {
			let embed = new Discord.MessageEmbed()
				.setAuthor(user.username, user.displayAvatarURL())
				.setColor("#ff614f")
				.setDescription(
					`<:warning:888603406493683712> **It's Looks You Already Have ${
						reaction.message.guild.roles.cache.get(role).name
					}** `
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();
			if (member.roles.cache.has(role)) return user.send(embed);
			let success = new Discord.MessageEmbed()
				.setAuthor("Role Added")
				.setColor("#3d8eff")
				.setDescription(
					`You have got the **${
						reaction.message.guild.roles.cache.get(role).name
					}** role by reacting in ${reaction.message.guild.name}`
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();

			member.roles.add(role);
			return user.send(success);
		});
	}
});

client.on('messageReactionAdd', async (reaction, user) => {
	if (user.partial) await user.fetch();
	if (reaction.partial) await reaction.fetch();
	if (reaction.message.partial) await reaction.message.fetch();
	if (user.bot) return;
	let emote = await db.get(
		`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!emote) return;
	let messageid = await db.get(
		`message_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!messageid) return;
	let role = await db.get(
		`role_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!role) return;

	if (reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
		reaction.message.guild.members.fetch(user).then(member => {
			let embed = new Discord.MessageEmbed()
				.setAuthor(user.username, user.displayAvatarURL())
				.setColor("#ff614f")
				.setDescription(
					`<:warning:888603406493683712> **It's Looks You Already Have ${
						reaction.message.guild.roles.cache.get(role).name
					}** `
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();
			if (member.roles.cache.has(role)) return user.send(embed);
			let success = new Discord.MessageEmbed()
				.setAuthor("Role Added")
				.setColor("#3d8eff")
				.setDescription(
					`You have got the **${
						reaction.message.guild.roles.cache.get(role).name
					}** role by reacting in ${reaction.message.guild.name}`
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();

			member.roles.add(role);
			return user.send(success);
		});
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	console.log(user.username);
	if (user.partial) await user.fetch();
	if (reaction.partial) await reaction.fetch();
	if (reaction.message.partial) await reaction.message.fetch();
	if (user.bot) return;
	let emote = await db.get(
		`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!emote) return;
	let messageid = await db.get(
		`message_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!messageid) return;
	let role = await db.get(
		`role_${reaction.message.guild.id}_${reaction.emoji.id}`
	);
	if (!role) return;
	if (reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
		reaction.message.guild.members.fetch(user).then(member => {
			let embed = new Discord.MessageEmbed()
				.setAuthor("Role Removed")
				.setColor("#ff614f")
				.setDescription(
					`You have got the **${
						reaction.message.guild.roles.cache.get(role).name
					}** role removed by unreacting in ${reaction.message.guild.name}`
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();
			user.send(embed);
			member.roles.remove(role);
		});
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	console.log(user.username);
	if (user.partial) await user.fetch();
	if (reaction.partial) await reaction.fetch();
	if (reaction.message.partial) await reaction.message.fetch();
	if (user.bot) return;
	let emote = await db.get(
		`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!emote) return;
	let messageid = await db.get(
		`message_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!messageid) return;
	let role = await db.get(
		`role_${reaction.message.guild.id}_${reaction.emoji.name}`
	);
	if (!role) return;
	if (reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
		reaction.message.guild.members.fetch(user).then(member => {
			let embed = new Discord.MessageEmbed()
				.setAuthor("Role Removed")
				.setColor("#ff614f")
				.setDescription(
					`You have got the **${
						reaction.message.guild.roles.cache.get(role).name
					}** role removed by unreacting in ${reaction.message.guild.name}`
				)
				.setFooter(
					reaction.message.guild.name,
					reaction.message.guild.iconURL()
				)
				.setTimestamp();
			user.send(embed);
			member.roles.remove(role);
		});
	}
});

client.login(config.token);

require('http').createServer((req, res) => res.end('NAMASTE WORLD')).listen(2000)


client.on("message", message => {
    if (message.author.bot) return false;

    if (message.content.includes("@here") || message.content.includes("@everyone")) return false;

    if (message.mentions.has(client.user.id)) {
        message.channel.send({embed: {
          color: 3447003,
          description: "Too see my all commands use `rr!help`"
          }});
    };
});

client.on("ready", () => {
  client.user.setStatus("online"); // You Can Set It To dnd, online, idle.
});


client.on("ready", () => {
  client.user.setStatus("online");
});


client.on("ready", async () => {
  console.log(`[--------------------- LOADED ---------------------]`)
  const status = [
    `in ${client.guilds.cache.size} Servers`,
    `with ${client.users.cache.size} Users`,
    `rr!help`,
    `in dsc.gg/dailydanks`,
  ]
  setInterval(() => {
    client.user.setActivity(status[Math.floor(Math.random() * status.length)], { type: "PLAYING" })//WATCHING // STREAMING / PLAYING
  }, 3000)
});
