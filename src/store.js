import "fs";
import "config";

// Instead of loading everything this time, I will just do a 
// Map of commandName => file and require at execute time.

function load (store) {
    const fileList = fs.readdirSync(config.get("bot.commandDir"));
    fileList.forEach(el => {
        store.set(require(el).name, el)
    });
    return store;
}

export default load;