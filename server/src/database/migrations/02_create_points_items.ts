import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("point_items", (table) => {
    table.increments("id").primary();

    table.integer("point_id")
      .notNullable()
      .references("id")
      .inTable("points");

    table.integer("item_id")
      .notNullable()
      .references("id")
      .inTable("items");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("point_items");
}


// todo: Palavras do especialista;

// ? como criar uma chave estrangeira no banco com knex?
//  * R: para criar o a chave, vamos passar o campo de referencia(que no caso é o id) e passamos o nome da tabela;

// ? qual campos usar para referenciar? 
// * R: passamos o campo 'references',  e passamos o nome da table com o 'inTable'!