const utils = require("../util");

module.exports.run = function(client, msg, args) {
	const metas = client.handler.returnCommandMetas();
	const embed = new utils.embed().setTitle("Help");
	let help = "";
	metas.forEach(el => {
		help += `\`${el.name}\` - ${el.description}\n`;
	});
	embed.setDescription(help);
	msg.channel.send(embed);
};

module.exports.meta = {
	name: "help",
	description: "Returns a list of commands and their descriptions"
};
