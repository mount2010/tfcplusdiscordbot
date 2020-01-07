import fs from "fs";
import config from "config";

function load (store) {
    const directory = config.get("bot.commandDir");
    const fileList = fs.readdirSync(directory);
    fileList.forEach(el => {
        const meta = require("./" + directory + "/" + el);
        const commandName = meta.default.name;
        const execute = meta.default.execute;
        store.set(commandName, execute);
        console.log("Loaded " + commandName);
    });
    return store;
}

export default load;