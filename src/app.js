import discord from "discord.js";
import config from "config";
import handle from "./handler.js";

const client = new discord.Client();

function onReady () {
    console.log(`Ready as ${client.user.username}.`);
}

function onMessage (message) {
    handle(message);
}

client.login(config.get("bot.token"));
client.on("ready", onReady);
client.on("message", onMessage);