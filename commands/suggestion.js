import Suggestion from "../suggestion";
import User from "../user";
import util from "../util";

async function execute (message, args) {
    const userId = message.author.id;
    const user = await User.findOrCreate({where: {userId}});
    const isAdmin = user.admin;
    util.runSubCommands({
        default: function () {
            const adminIndex = `
                \`edit <id>\`: Edit suggestion
                \`approve <id>\`: Approve suggestion
                \`deny <id>\`: Deny suggestion
                \`remove <id>\`: Remove suggestion 
                \`list <sort>\`: List suggestions by TOP, APPROVED, BOTTOM, NEWEST, or OLDEST
                \`import <message_id> <user_id>\`: Import suggestion from old bot to new bot. Not automatically approved. Approve manually using the approve subcommand
            `;
            const userIndex = `
                \`edit <id>\`: Edit suggestion
                \`remove <id>\`: Remove suggestion
                \`list <sort>\`: List suggestions by TOP, APPROVED, BOTTOM, NEWEST, or OLDEST
            `;
            message.channel.send({
                embed: util.getEmbed("embeds.suggestion.default", {
                    index: isAdmin ? adminIndex : userIndex
                })
            });
        }
    }, args[0]);
}

const meta = {
    execute, 
    name: "suggestion"
}

export default meta;