import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('item').insert([
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Pápeis e Papelão', image: 'papeis-papelão.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ])
} 




// ? vamos usar items que vai ser padrão do banco de dados, pq vamos precisar

// ? como vamos fazer o post na tabela ?
// * R: usamos o knex('') para passarmos o tabela e para fazer o post usamos o **insert** e como queremos adicionar na mão mesmo , vamos fazer em forma de array; [{ aqui passamos os campos }]