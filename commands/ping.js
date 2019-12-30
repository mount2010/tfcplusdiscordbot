import util from "../util";

function ping (message) {
    message.channel.send({embed: util.getEmbed("embeds.ping")});
}

const meta = {
    execute: ping,
    name: "ping"
}

export default meta;