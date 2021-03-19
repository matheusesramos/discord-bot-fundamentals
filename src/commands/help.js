const execute = (bot, msg, args) => {
    let str = `**===== LISTA DE COMANDOS =====**\n`;
    bot.commands.forEach(command => {
        if (command.help) {
            str += `**${process.env.PREFIX + command.name}**: ${command.help}\n`
        }
    })
    return msg.channel.send(str);
}

module.exports = {
    name: "help",
    help: "Exibe uma lista com todos os comandos disponíveis.",
    execute
}