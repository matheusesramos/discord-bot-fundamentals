const MessageEmbed = require('discord.js').MessageEmbed;
var knex = require('../database/index');

const execute = async (bot, msg, args) => {
    if (!args || args.length === 0 || args[0] === '') {
        return msg.reply("Comando incompleto. Tenta de novo :pleading_face:");
    }

    await knex.select("*")
        .from("users")
        .where("user", args[0])
        .then(usersList => {
            if (usersList.length > 0) {
                const embed = new MessageEmbed()
                    .setColor(usersList[0].color)
                    .setAuthor(usersList[0].user, `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`, `https://www.github.com/${usersList[0].user}`)
                    .setDescription(`Minha cor: ${usersList[0].color}`)
                    .setThumbnail(`https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`)
                    .setTimestamp()
                    .setFooter('Texto do rodapé', `https://cdn.discordapp.com/icons/${msg.guild.id}/${msg.guild.icon}.png`);
                return msg.channel.send(embed);
            }
            return msg.reply("Usuário não encontrado.");
        })
        .catch(error => {
            return msg.reply("Erro ao consultar o usuário, informe o adminstrador. " + error);
        })
}

module.exports = {
    name: "profile",
    help: "Retorna o perfil do usuário informado.",
    execute
}