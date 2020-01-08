import Suggestion from "../suggestion";
import util from "../util";

async function newSuggestion (timestamp, text, user) {
    const suggestion = await Suggestion.create(
        {
            text: text,
            userId: user.id,
            userAvatar: user.avatar,
            modified: timestamp
        }
    );
}

/**
 * Sets variables that are compatible with the database manipulating functions above
 */
function parseUser (discordJsUser) {
    const user = {
        id: discordJsUser.id,
        avatar: discordJsUser.avatarURL
    };
    return user;
}

async function suggest (message, args) {
    const user = parseUser(message.author);
    try {
        await newSuggestion(message.createdTimestamp.toString(10), args.join(" "), user);
        message.channel.send({embed: util.getEmbed("embeds.suggest.success")});
    }
    catch (err) {
        message.channel.send({embed: util.getEmbed("embeds.suggest.error")});
    }
}

const meta = {
    execute: suggest,
    name: "suggest"
}

export default meta;