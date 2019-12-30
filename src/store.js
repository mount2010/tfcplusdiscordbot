import fs from "fs";
import config from "config";

// Instead of loading everything this time, I will just do a 
// Map of commandName => file and require at execute time.

function load (store) {
    const directory = config.get("bot.commandDir");
    const fileList = fs.readdirSync(directory);
    fileList.forEach(el => {
        const meta = require("./" + directory + "/" + el);
        const commandName = meta.default.name;
        store.set(commandName, "./" + directory + "/" + el);
        console.log("Loaded " + commandName);
    });
    return store;
}

export default load;