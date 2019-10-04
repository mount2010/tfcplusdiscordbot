const discord = require("discord.js");

module.exports.run = function(client, msg, args) {
	const metas = client.handler.returnCommandMetas();
	const embed = new discord.RichEmbed().setTitle("Help");
	metas.forEach(el => {
		embed.addField(el.name, el.description || "No description provided");
	});
	msg.channel.send(embed);
};

module.exports.meta = {
	name: "help",
	description: "Returns a list of commands and their descriptions"
};
