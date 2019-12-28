import config from "config";
import "mustache";
import "./view.js";

function check (content) {
    const prefix = config.get("bot.prefix");
    const regex = new RegExp("^"+prefix, "i");
    return regex.test(content);
}

function parse (content) {
    content = content.split(" ");
    const prefix = config.get("bot.prefix");
    // Only replaces first occurance, don't worry
    const command = content[0].replace(prefix, "");
    const args = content.slice(1);
    return [command, args];
}

/**
 * @param {discord.Message} message 
 * @param {Map} store 
 */
function handle (message, store) {
    if (message.author.bot) return false;
    if (!check(message.content)) return false;
    const [command, args] = parse(message.content);
    if (store.has(command)) {
        const execute = require(store.get(command)).execute;
        try {
            execute(message, args);
        }
        catch (error) {
            const embed = Mustache.render(config.get("embeds.error"), {...view});
            message.channel.send({embed: embed});
        }
    }
}

export default handle;
export {check, parse, handle};
