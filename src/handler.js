const fs = require("fs");
const discord = require("discord.js");
const config = require("../config/config.json");

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
				`\x1b[32mLoaded command \x1b[32;1m${command.meta.name}.\x1b[0m`
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
		} catch (err) {
			message.channel.send(
				new discord.RichEmbed()
					.setTitle("Command threw an error")
					.setColor(0xff0000)
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
