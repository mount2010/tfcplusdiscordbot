const fs = require("fs");
const discord = require("discord.js");
const config = require("../config/config.json");
const util = require("./util");

class Handler {
	constructor(client) {
		this.commandStore = new discord.Collection();
		this.client = client;
	}
	loadCommands(folder) {
		const files = fs.readdirSync(folder);
		files.forEach(el => {
			const command = require(`${folder}/${el}`);
			this.commandStore.set(command.meta.name, command);
			console.log(
				`${util.color("green")}Loaded command ${util.color(
					"green",
					true
				)}${command.meta.name}${util.color("reset")}`
			);
		});
	}
	handleMessage(message) {
		const args = message.content.split(" ");
		const rawCommand = args.shift();
		let command;
		const commandRegex = new RegExp(`^{}(.*)`.replace("{}", config.prefix));
		const matches = commandRegex.exec(rawCommand);

		if (message.author.bot) {
			return;
		}
		if (matches) {
			command = matches[1];
		}
		if (!this.commandStore.has(command)) {
			return;
		}

		try {
			this.commandStore.get(command).run(this.client, message, args);
			console.log(
				`${new Date().toUTCString()} - ${message.author.username} (${
					message.author.id
				}) executed ${message.content}`
			);
		} catch (err) {
			message.channel.send(
				new discord.RichEmbed()
					.setTitle("Command threw an error")
					.setColor(config.colors.error)
					.setDescription(
						"The command failed for some reason. Please try again. Report this if it keeps happening."
					)
			);
			console.error(err);
		}
	}
	returnCommandMetas() {
		return this.commandStore.map(el => el.meta);
	}
}
module.exports = Handler;
