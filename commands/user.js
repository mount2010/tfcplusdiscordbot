import User from "../user";
import util from "../util";

const usage = "!!user <subcommand> <userid>";

function execute (message, args) {
    if (!util.requireArgs(args, 2)) {
        message.channel.send({embed: util.getEmbed("embeds.notEnoughArguments", {usage})});
        return;
    }
    util.runSubCommands({
        default: function () {
            message.channel.send({embed: util.getEmbed("embeds.user.default")})
        },
        setAdmin: async function () {
            let user = await User.findOrCreate({where: {userId: args[1]}});
            console.log(user.get());
            message.channel.send(util.getEmbed("embeds.user.makeAdminSuccess", {user: args[1]}));
        }
    }, args[0]);
}

const meta = {
    name: "user",
    execute,
    permission: "admin"
}

export default meta;