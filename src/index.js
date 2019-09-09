const discord = require("discord.js");
const path = require("path");

const Client = require("./client");
const secrets = require("../config/secrets.json");

const client = new Client();
client.loadCommands(path.join(__dirname, "commands"));
client.start(secrets);
