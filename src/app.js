import discord from "discord.js";
import config from "config";
import handle from "./handler";
import load from "./store";

const client = new discord.Client();
const store = load(new Map());

function onReady () {
    console.log(`Ready as ${client.user.username}.`);
}

function onMessage (message) {
    handle(message, store);
}

client.login(config.get("bot.token"));
client.on("ready", onReady);
client.on("message", onMessage);