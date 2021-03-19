var knex = require('../database/index');

const execute = async (bot, msg, args) => {
    if (!args[2]) {
        return msg.reply("Dados incompletos. Tenta mais uma vez :clown:");
    }

    await knex.select("user")
        .from("users")
        .where("user", args[0])
        .then(usersList => {
            if (usersList.length === 0) {
                return knex('users')
                    .insert([{
                        user: args[0],
                        password: args[1],
                        color: args[2]
                    }])
                    .then((newUserId) => {
                        msg.reply("Usuário cadastrado com sucesso!");
                    });
            }
            return msg.reply("Já existe esse usuário, tenta outro :pensive:");
        })
        .catch(error => {
            return msg.reply(":no_entry_sign: Erro ao cadastrar usuário, informe o adminstrador. " + error);
        })
}

module.exports = {
    name: "new",
    help: "Cria um novo usuário na base de usuários.",
    execute
}