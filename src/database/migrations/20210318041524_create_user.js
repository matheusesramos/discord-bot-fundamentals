exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('user').unique().notNullable()
    table.string('password').notNullable()
    table.string('color').notNullable()
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
})

exports.down = knex => knex.schema.dropTable('users');
