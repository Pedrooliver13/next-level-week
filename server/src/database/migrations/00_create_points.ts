import Knex from 'knex';

export async function up(knex: Knex) {
  // aqui vamos criar a tabela;
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('logitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
}

export async function down(knex: Knex) {
  // aqui vamos deletar a tabela;
  return knex.schema.dropTable('points');
}


/*  

todo: como criar uma tabela com o knex;

* knex.schema.createTable('nome da tabela', table => {
  ? table.increments('id').primary();
  ? table.string('name').notNullable();
  ? table.decimal('logitude');
* });

 */

 // * primeiro parâmetro, passamos em forma de uma STRING o nome da função;
 // * o segundo parâmetro, é uma função que iremos passar os campos que iremos criar;

 // ! table.increments().primary() --> ele faz auto incrementação da informação || primary ;
 // ! table.string().notNullable();
 // ! table.decimal().notNullable(); --> número;
