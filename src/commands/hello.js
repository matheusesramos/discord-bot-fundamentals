const execute = (bot, msg, args) => {
    return msg.reply("Oie :heart_eyes:");
}

module.exports = {
    name: "hello",
    help: "Te envia um Oi.",
    execute
}