import config from "config";
import util from "./util";
import User from "./user";

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

async function checkPermission (userId, meta) {
    const user = await User.findOrCreate({where: {userId}});
    if (meta.permission === "admin" && !user[0].admin) return false;
    else return true; 
}

/**
 * @param {discord.Message} message 
 * @param {Map} store 
 */
async function handle (message, store) {
    if (message.author.bot) return false;
    if (!check(message.content)) return false;
    const [command, args] = parse(message.content);
    const meta = store.get(command);
    if (!(await checkPermission(message.author.id, meta))) {
        message.channel.send({embed: util.getEmbed("embeds.noPermission")});
        return false;
    }

    if (store.has(command)) {
        const execute = meta.execute;
        try {
            execute(message, args);
        }
        catch (error) {
            message.channel.send({embed: util.getEmbed("embeds.error")});
            console.error(error);
        }
    }
}

export default handle;
export {checkPermission, handle};
