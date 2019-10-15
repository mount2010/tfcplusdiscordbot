const utils = require("../util");

module.exports.run = function(client, msg, args) {
	const embed = utils
		.embed("success")
		.setTitle("Info about me")
		.setDescription(
			"TFC+ Bot is developed by Mount2010 in order to provide information for the TFC+ server."
		)
		.addField(
			"Repository",
			"https://github.com/mount2010/tfcplusdiscordbot"
		)
		.addField("Uptime", `${Math.floor(process.uptime()) / 60 / 60} hours`)
		.addField(
			"RAM Usage",
			`${process.memoryUsage().heapUsed / 1000000} MB`
		);
	msg.channel.send(embed);
};

module.exports.meta = {
	name: "info",
	description: "View information about me"
};
