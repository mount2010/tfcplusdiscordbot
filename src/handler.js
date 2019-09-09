const fs = require("fs");
const config = require("../config/config.json");

class Handler {
    constructor (client) {
        this.commandStore = new Map();
        this.client = client;
    }
    loadCommands (folder) {
        const files = fs.readdirSync(folder);
        files.forEach(el=>{
            const command = require(`${folder}/${el}`);
            this.commandStore.set(command.meta.name, command);
        });
    }
    handleMessage (message) {
        const args = message.content.split(" ");
        const rawCommand = args.shift();
        let command;
        const commandRegex = new RegExp(`{}(.*)`.replace("{}", config.prefix));
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

        this.commandStore.get(command).run(this.client, message, args);
    }
}
module.exports = Handler;