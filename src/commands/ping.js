function ping (message) {
    message.channel.send("Pong!");
}

const meta = {
    execute: ping,
    name: "ping"
}

export default meta;