import fs from "fs";
import config from "config";

function load (store) {
    const directory = config.get("bot.commandDir");
    const fileList = fs.readdirSync(directory);
    fileList.forEach(el => {
        const meta = require("./" + directory + "/" + el).default;
        const commandName = meta.name;
        store.set(commandName, meta);
        console.log("Loaded " + commandName);
    });
    return store;
}

export default load;