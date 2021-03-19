const Discord = require('discord.js');
require('dotenv').config()
const fs = require('fs');
const path = require('path');

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, "/commands")).filter(filename => filename.endsWith(".js"));

for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.log(`Estou conectado como ${bot.user.username}`);
})

bot.on('message', (msg) => {
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
    const totalArgs = msg.content.slice(process.env.PREFIX.length).split(' ');
    const command = totalArgs.shift();
    const filteredArgs = totalArgs.join(' ').split(',');

    try {
        bot.commands.get(command).execute(bot, msg, filteredArgs);
    } catch (error) {
        return msg.reply("eu ainda não conheço esse comando :pensive:");
    }
})