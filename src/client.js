const discord = require("discord.js");
const Handler = require("./handler");
const config = require("../config/config.json");

class Client extends discord.Client {
	constructor() {
		super({});
		this.handler = new Handler(this);
	}
	loadCommands(folder) {
		this.handler.loadCommands(folder);
	}
	start(secrets) {
		this.login(secrets.token);
		this.on("ready", this.onReady.bind(this));
		this.on("message", this.handler.handleMessage.bind(this.handler));
	}
	onReady() {
		console.log(`Logged in as ${this.user.username}.`);
		this.user.setActivity(`Terrafirmacraft+ | ${config.prefix}help`, {
			type: "PLAYING"
		});
	}
}

module.exports = Client;
