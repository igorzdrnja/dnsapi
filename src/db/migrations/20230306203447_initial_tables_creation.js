export async function up(knex) {
await knex.schema.createTable('queries', (table) => {
        table.increments('id');
        table.string('domain');
        table.string('client_ip');
        table.json('addresses');
        table.integer('created_at').defaultTo(Math.floor(Date.now() / 1000));
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('queries');
}

