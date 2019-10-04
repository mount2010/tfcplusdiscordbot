module.exports.run = function(client, msg, args) {
	msg.reply("Pong");
};

module.exports.meta = {
	name: "ping",
	description: "Checks if the bot is online"
};
